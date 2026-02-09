const pool = require('../config/db');

exports.getAllShirts = async (req, res) => {
  try {
    const { brand, league, season, minPrice, maxPrice, sortBy, tipo, version, rating } = req.query;

    let query = `
      SELECT
        id_shirts, season, league, team, brand, price, color, tipo, version, rating,
        image_url, image_1, image_2, image_3, image_4, description
      FROM shirts
      WHERE 1=1
    `;

    const params = [];

    if (brand) {
      const brands = brand.split(',');
      query += ` AND brand IN (${brands.map(() => '?').join(',')})`;
      params.push(...brands);
    }

    if (league) {
      const leagues = league.split(',');
      query += ` AND league IN (${leagues.map(() => '?').join(',')})`;
      params.push(...leagues);
    }

    if (season) {
      const seasons = season.split(',');
      query += ` AND season IN (${seasons.map(() => '?').join(',')})`;
      params.push(...seasons);
    }

    if (tipo) {
      const tipos = tipo.split(',');
      query += ` AND tipo IN (${tipos.map(() => '?').join(',')})`;
      params.push(...tipos);
    }

    if (version) {
      const versions = version.split(',');
      query += ` AND version IN (${versions.map(() => '?').join(',')})`;
      params.push(...versions);
    }

    if (rating) {
      query += ` AND rating = ?`;
      params.push(parseInt(rating));
    }

    if (minPrice) {
      query += ` AND price >= ?`;
      params.push(parseFloat(minPrice));
    }

    if (maxPrice) {
      query += ` AND price <= ?`;
      params.push(parseFloat(maxPrice));
    }

    if (sortBy === 'price_asc') {
      query += ` ORDER BY price ASC`;
    } else if (sortBy === 'price_desc') {
      query += ` ORDER BY price DESC`;
    } else if (sortBy === 'recent') {
      query += ` ORDER BY date_added DESC`;
    } else if (sortBy === 'name_asc') {
      query += ` ORDER BY team ASC`;
    } else {
      query += ` ORDER BY date_added DESC`;
    }

    const [rows] = await pool.query(query, params);

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
    const { season, league, team, player, brand, color, price, image_url, description, buy_link } = req.body;

    const [result] = await pool.query(
      'INSERT INTO shirts (season, league, team, player, brand, color, price, image_url, description, buy_link) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [season, league, team, player, brand, color, price, image_url, description, buy_link]
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
    const { season, league, team, player, brand, color, price, image_url, description, buy_link } = req.body;

    const [result] = await pool.query(
      'UPDATE shirts SET season=?, league=?, team=?, player=?, brand=?, color=?, price=?, image_url=?, description=?, buy_link=? WHERE id_shirts=?',
      [season, league, team, player, brand, color, price, image_url, description, buy_link, req.params.id]
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
