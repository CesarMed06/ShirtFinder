const pool = require("../config/db");

exports.getCommentsByShirt = async (req, res) => {
    try {
        const { shirtId } = req.params;

        const [comments] = await pool.query(
            `SELECT c.id_comments, c.text, c.rating, c.date, u.username, u.avatar_url
            FROM comments c
            JOIN users u ON c.user_id = u.id_users
            WHERE c.shirt_id = ?
            ORDER BY c.date DESC`,
            [shirtId],
        );

        const commentsWithRating = comments.map((c) => ({
            ...c,
            rating: parseFloat(c.rating) || 0,
        }));

        res.status(200).json({ success: true, data: commentsWithRating });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

exports.addComment = async (req, res) => {
    try {
        const { shirtId } = req.params;
        const { text, rating } = req.body;
        const userId = req.user.id;

        if (!text || text.trim() === "") {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "El comentario no puede estar vacío",
                });
        }

        const [existing] = await pool.query(
            "SELECT id_comments FROM comments WHERE shirt_id = ? AND user_id = ?",
            [shirtId, userId],
        );

        if (existing.length > 0) {
            return res
                .status(400)
                .json({ success: false, message: "Ya has valorado esta camiseta" });
        }

        const ratingValue = parseFloat(rating) || 0;

        const [result] = await pool.query(
            "INSERT INTO comments (shirt_id, user_id, text, rating) VALUES (?, ?, ?, ?)",
            [shirtId, userId, text, ratingValue],
        );

        const [newComment] = await pool.query(
            `SELECT c.id_comments, c.text, c.rating, c.date, u.username, u.avatar_url
            FROM comments c
            JOIN users u ON c.user_id = u.id_users
            WHERE c.id_comments = ?`,
            [result.insertId],
        );

        const commentWithRating = {
            ...newComment[0],
            rating: parseFloat(newComment[0].rating) || 0,
        };

        res.status(201).json({ success: true, data: commentWithRating });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

exports.getUserComments = async (req, res) => {
    try {
        const userId = req.user.id;

        const [comments] = await pool.query(
            `SELECT c.id_comments, c.text, c.rating, c.date,
                    s.id_shirts, s.team, s.season, s.image_url, s.image_1
                    FROM comments c
                    JOIN shirts s ON c.shirt_id = s.id_shirts
                    WHERE c.user_id = ?
                    ORDER BY c.date DESC`,
                    [userId],
        );

        res.status(200).json({ success: true, data: comments });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

exports.deleteComment = async (req, res) => {
    try {
        const { commentId } = req.params;
        const userId = req.user.id;

        const [comment] = await pool.query(
            "SELECT * FROM comments WHERE id_comments = ?",
            [commentId],
        );

        if (comment.length === 0) {
            return res
                .status(404)
                .json({ success: false, message: "Comentario no encontrado" });
        }

        if (comment[0].user_id !== userId) {
            return res.status(403).json({ success: false, message: "No autorizado" });
        }

        await pool.query("DELETE FROM comments WHERE id_comments = ?", [commentId]);
        res.status(200).json({ success: true, message: "Comentario eliminado" });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
