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
            `SELECT p.id, p.title, p.content, p.category, p.created_at, p.replies_count,
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
