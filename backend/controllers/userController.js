const pool = require('../config/db');

exports.getProfile = async (req, res) => {
    try {
        const userId = req.user.id;

        const [rows] = await pool.query(
            `SELECT u.id_users, u.username, u.email, u.date_registered, 
              (SELECT COUNT(*) FROM comments WHERE user_id = u.id_users) as comment_count,
              (SELECT COUNT(*) FROM favorites WHERE user_id = u.id_users) as favorites_count
       FROM users u
       WHERE u.id_users = ?`,
            [userId]
        );

        if (rows.length === 0) {
            return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
        }

        res.json({ success: true, data: rows[0] });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al obtener perfil' });
    }
};

exports.getUserComments = async (req, res) => {
    try {
        const userId = req.user.id;

        const [rows] = await pool.query(
            `SELECT c.id_comments, c.text, c.rating, c.date, 
              s.id_shirts, s.team, s.season
       FROM comments c
       JOIN shirts s ON c.shirt_id = s.id_shirts
       WHERE c.user_id = ?
       ORDER BY c.date DESC
       LIMIT 5`,
            [userId]
        );

        res.json({ success: true, data: rows });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al obtener comentarios' });
    }
};
exports.getUserFavorites = async (req, res) => {
    try {
        const userId = req.user.id;

        const [rows] = await pool.query(
            `SELECT f.id_favorites, f.date as date_added,
              s.id_shirts, s.team, s.season, s.price, s.image_url
       FROM favorites f
       JOIN shirts s ON f.shirt_id = s.id_shirts
       WHERE f.user_id = ?
       ORDER BY f.date DESC`,
            [userId]
        );

        res.json({ success: true, data: rows });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al obtener favoritos' });
    }
};
