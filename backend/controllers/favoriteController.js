let pool;
try {
  pool = require('../config/db');
} catch (e) {
  pool = require('../config/database');
}

const db = pool && typeof pool.promise === 'function' ? pool.promise() : pool;

const addFavorite = async (req, res) => {
  try {
    const userId = req.user?.id;
    const shirtId = Number(req.params.shirtId);
    if (!userId || !shirtId) return res.status(400).json({ success: false, message: 'Datos inválidos' });

    await db.query('INSERT INTO favorites (user_id, shirt_id, date) VALUES (?, ?, NOW())', [userId, shirtId]);
    res.json({ success: true, message: 'Añadido a favoritos' });
  } catch (err) {
    if (err && (err.code === 'ER_DUP_ENTRY' || err.errno === 1062)) {
      return res.json({ success: false, message: 'Ya está en favoritos' });
    }
    res.status(500).json({ success: false, message: 'Error del servidor' });
  }
};

const removeFavorite = async (req, res) => {
  try {
    const userId = req.user?.id;
    const shirtId = Number(req.params.shirtId);
    if (!userId || !shirtId) return res.status(400).json({ success: false, message: 'Datos inválidos' });

    await db.query('DELETE FROM favorites WHERE user_id = ? AND shirt_id = ?', [userId, shirtId]);
    res.json({ success: true, message: 'Eliminado de favoritos' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error del servidor' });
  }
};

const getUserFavorites = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.json([]);

    const [rows] = await db.query(
      `SELECT s.id_shirts, s.season, s.league, s.team, s.brand, s.price, s.color, s.image_url, f.date as favorite_date
       FROM favorites f
       JOIN shirts s ON f.shirt_id = s.id_shirts
       WHERE f.user_id = ?
       ORDER BY f.date DESC`,
      [userId]
    );

    res.json(rows || []);
  } catch (err) {
    res.status(500).json([]);
  }
};

const checkFavorite = async (req, res) => {
  try {
    const userId = req.user?.id;
    const shirtId = Number(req.params.shirtId);
    if (!userId || !shirtId) return res.json({ isFavorite: false });

    const [rows] = await db.query(
      'SELECT id_favorites FROM favorites WHERE user_id = ? AND shirt_id = ?',
      [userId, shirtId]
    );

    res.json({ isFavorite: (rows || []).length > 0 });
  } catch (err) {
    res.json({ isFavorite: false });
  }
};

module.exports = { addFavorite, removeFavorite, getUserFavorites, checkFavorite };
