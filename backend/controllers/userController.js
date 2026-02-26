const pool = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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

exports.updateUsername = async (req, res) => {
    try {
        const { newUsername } = req.body;
        const userId = req.user.id;

        if (!newUsername || newUsername.trim() === '') {
            return res.status(400).json({ success: false, message: 'El nombre no puede estar vacío' });
        }

        const [exists] = await pool.query('SELECT id_users FROM users WHERE username = ?', [newUsername]);
        if (exists.length > 0) {
            return res.status(400).json({ success: false, message: 'Nombre de usuario ya en uso' });
        }

        await pool.query('UPDATE users SET username = ? WHERE id_users = ?', [newUsername, userId]);
        res.json({ success: true, message: 'Nombre actualizado' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.updateEmail = async (req, res) => {
    try {
        const { newEmail } = req.body;
        const userId = req.user.id;

        if (!newEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newEmail)) {
            return res.status(400).json({ success: false, message: 'Email no válido' });
        }

        const [current] = await pool.query('SELECT email FROM users WHERE id_users = ?', [userId]);
        if (current[0].email === newEmail) {
            return res.status(400).json({ success: false, message: 'El email es igual al actual' });
        }

        const [exists] = await pool.query('SELECT id_users FROM users WHERE email = ?', [newEmail]);
        if (exists.length > 0) {
            return res.status(400).json({ success: false, message: 'Email ya en uso' });
        }

        await pool.query('UPDATE users SET email = ? WHERE id_users = ?', [newEmail, userId]);
        const token = jwt.sign({ id: userId, email: newEmail }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.json({ success: true, token });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.updatePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;
        const userId = req.user.id;

        if (!newPassword || newPassword.length < 6) {
            return res.status(400).json({ success: false, message: 'Mínimo 6 caracteres' });
        }

        const [rows] = await pool.query('SELECT password FROM users WHERE id_users = ?', [userId]);
        const valid = await bcrypt.compare(currentPassword, rows[0].password);
        if (!valid) {
            return res.status(400).json({ success: false, message: 'Contraseña actual incorrecta' });
        }

        const hashed = await bcrypt.hash(newPassword, 10);
        await pool.query('UPDATE users SET password = ? WHERE id_users = ?', [hashed, userId]);
        res.json({ success: true, message: 'Contraseña actualizada' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.updateAvatar = async (req, res) => {
    try {
        const userId = req.user.id;
        if (!req.file) {
            return res.status(400).json({ success: false, message: 'No se subió ninguna imagen' });
        }

        const avatarUrl = `/uploads/avatars/${req.file.filename}`;
        await pool.query('UPDATE users SET avatar_url = ? WHERE id_users = ?', [avatarUrl, userId]);
        res.json({ success: true, avatarUrl });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.deleteAccount = async (req, res) => {
    try {
        const userId = req.user.id;
        await pool.query('DELETE FROM comments WHERE user_id = ?', [userId]);
        await pool.query('DELETE FROM favorites WHERE user_id = ?', [userId]);
        await pool.query('DELETE FROM users WHERE id_users = ?', [userId]);
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
