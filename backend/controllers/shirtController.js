const pool = require('../config/db');

exports.getAllShirts = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM shirts ORDER BY date_added DESC');
    
    res.status(200).json({
      success: true,
      count: rows.length,
      data: rows
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getShirtById = async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM shirts WHERE id_shirts = ?',
      [req.params.id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ 
        success: false, 
        message: 'Camiseta no encontrada' 
      });
    }

    res.status(200).json({
      success: true,
      data: rows[0]
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.createShirt = async (req, res) => {
  try {
    const { season, league, team, player, brand, color, price, image_url, story, key_events, fun_fact, buy_link } = req.body;

    const [result] = await pool.query(
      'INSERT INTO shirts (season, league, team, player, brand, color, price, image_url, story, key_events, fun_fact, buy_link) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [season, league, team, player, brand, color, price, image_url, story, key_events, fun_fact, buy_link]
    );

    res.status(201).json({
      success: true,
      data: {
        id: result.insertId,
        ...req.body
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.updateShirt = async (req, res) => {
  try {
    const { season, league, team, player, brand, color, price, image_url, story, key_events, fun_fact, buy_link } = req.body;

    const [result] = await pool.query(
      'UPDATE shirts SET season=?, league=?, team=?, player=?, brand=?, color=?, price=?, image_url=?, story=?, key_events=?, fun_fact=?, buy_link=? WHERE id_shirts=?',
      [season, league, team, player, brand, color, price, image_url, story, key_events, fun_fact, buy_link, req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ 
        success: false, 
        message: 'Camiseta no encontrada' 
      });
    }

    res.status(200).json({
      success: true,
      message: 'Camiseta actualizada correctamente'
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.deleteShirt = async (req, res) => {
  try {
    const [result] = await pool.query(
      'DELETE FROM shirts WHERE id_shirts = ?',
      [req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ 
        success: false, 
        message: 'Camiseta no encontrada' 
      });
    }

    res.status(200).json({
      success: true,
      message: 'Camiseta eliminada correctamente'
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
