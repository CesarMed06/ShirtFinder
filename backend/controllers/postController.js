const pool = require('../config/db');

exports.getPosts = async (req, res) => {
    try {
        const { category, orderBy, direction } = req.query;
        const dir = direction === 'asc' ? 'ASC' : 'DESC';

        let orderClause = `p.created_at ${dir}`;
        if (orderBy === 'comments' || orderBy === 'replies') orderClause = `p.replies_count ${dir}`;

        let whereClause = '';
        const params = [];
        if (category) {
            whereClause = 'WHERE p.category = ?';
            params.push(category);
        }

        const [posts] = await pool.query(
            `SELECT p.id, p.title, LEFT(p.content, 80) AS preview, p.category,
                    p.created_at, p.replies_count,
                    u.username, u.avatar_url
             FROM posts p
             JOIN users u ON p.user_id = u.id_users
             ${whereClause}
             ORDER BY ${orderClause}`,
            params
        );

        res.json({ success: true, data: posts });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

exports.createPost = async (req, res) => {
    try {
        const { title, content, category } = req.body;
        const userId = req.user.id;

        if (!title || !content) {
            return res.status(400).json({ success: false, message: 'Título y contenido son obligatorios' });
        }

        const attachmentUrl = req.file ? `/uploads/posts/${req.file.filename}` : null;

        const [result] = await pool.query(
            'INSERT INTO posts (title, content, category, user_id, attachment_url) VALUES (?, ?, ?, ?, ?)',
            [title, content, category || 'General', userId, attachmentUrl]
        );

        res.status(201).json({ success: true, data: { id: result.insertId } });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

exports.getPostById = async (req, res) => {
    try {
        const { id } = req.params;

        const [rows] = await pool.query(
            `SELECT p.id, p.title, p.content, p.category, p.created_at, p.attachment_url, p.replies_count,
                    u.username, u.avatar_url
             FROM posts p
             JOIN users u ON p.user_id = u.id_users
             WHERE p.id = ?`,
            [id]
        );

        if (rows.length === 0) {
            return res.status(404).json({ success: false, message: 'Post no encontrado' });
        }

        res.json({ success: true, data: rows[0] });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

exports.getReplies = async (req, res) => {
    try {
        const { id } = req.params;

        const [rows] = await pool.query(
            `SELECT r.id, r.content, r.created_at,
                    u.username, u.avatar_url
             FROM replies r
             JOIN users u ON r.user_id = u.id_users
             WHERE r.post_id = ?
             ORDER BY r.created_at ASC`,
            [id]
        );

        res.json({ success: true, data: rows });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

exports.createReply = async (req, res) => {
    try {
        const { id } = req.params;
        const { content } = req.body;
        const userId = req.user.id;

        if (!content || !content.trim()) {
            return res.status(400).json({ success: false, message: 'El contenido no puede estar vacío' });
        }

        const [result] = await pool.query(
            'INSERT INTO replies (post_id, user_id, content) VALUES (?, ?, ?)',
            [id, userId, content]
        );

        await pool.query('UPDATE posts SET replies_count = replies_count + 1 WHERE id = ?', [id]);

        const [rows] = await pool.query(
            `SELECT r.id, r.content, r.created_at, u.username, u.avatar_url
             FROM replies r
             JOIN users u ON r.user_id = u.id_users
             WHERE r.id = ?`,
            [result.insertId]
        );

        res.status(201).json({ success: true, reply: rows[0] });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

exports.getUserPosts = async (req, res) => {
    try {
        const userId = req.user.id;

        const [rows] = await pool.query(
            `SELECT p.id, p.title, LEFT(p.content, 80) AS preview, p.created_at, p.replies_count
            FROM posts p
            WHERE p.user_id = ?
            ORDER BY p.created_at DESC`,
            [userId]
        );

        res.json({ success: true, data: rows });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

exports.deletePost = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        const [rows] = await pool.query('SELECT user_id FROM posts WHERE id = ?', [id]);
        if (rows.length === 0) return res.status(404).json({ success: false, message: 'Post no encontrado' });
        if (rows[0].user_id !== userId) return res.status(403).json({ success: false, message: 'No autorizado' });

        await pool.query('DELETE FROM replies WHERE post_id = ?', [id]);
        await pool.query('DELETE FROM posts WHERE id = ?', [id]);

        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
