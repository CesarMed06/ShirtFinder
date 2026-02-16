const pool = require('../config/db');

exports.getAllShirts = async (req, res) => {
  try {
    const { brand, league, season, minPrice, maxPrice, sortBy, tipo, version, rating } = req.query;

    let query = `
      SELECT
        s.id_shirts, s.season, s.league, s.team, s.brand, s.price, s.color, s.tipo, s.version,
        s.image_url, s.image_1, s.image_2, s.image_3, s.image_4, s.description,
        COALESCE(AVG(c.rating), 0) as average_rating,
        COUNT(c.id_comments) as comment_count
      FROM shirts s
      LEFT JOIN comments c ON s.id_shirts = c.shirt_id
      WHERE 1=1
    `;

    const params = [];

    if (brand) {
      const brands = brand.split(',');
      query += ` AND s.brand IN (${brands.map(() => '?').join(',')})`;
      params.push(...brands);
    }

    if (league) {
      const leagues = league.split(',');
      query += ` AND s.league IN (${leagues.map(() => '?').join(',')})`;
      params.push(...leagues);
    }

    if (season) {
      const seasons = season.split(',');
      query += ` AND s.season IN (${seasons.map(() => '?').join(',')})`;
      params.push(...seasons);
    }

    if (tipo) {
      const tipos = tipo.split(',');
      query += ` AND s.tipo IN (${tipos.map(() => '?').join(',')})`;
      params.push(...tipos);
    }

    if (version) {
      const versions = version.split(',');
      query += ` AND s.version IN (${versions.map(() => '?').join(',')})`;
      params.push(...versions);
    }

    if (minPrice) {
      query += ` AND s.price >= ?`;
      params.push(parseFloat(minPrice));
    }

    if (maxPrice) {
      query += ` AND s.price <= ?`;
      params.push(parseFloat(maxPrice));
    }

    query += ` GROUP BY s.id_shirts`;

    if (rating) {
      query += ` HAVING average_rating >= ?`;
      params.push(parseInt(rating));
    }

    if (sortBy === 'price_asc') {
      query += ` ORDER BY s.price ASC`;
    } else if (sortBy === 'price_desc') {
      query += ` ORDER BY s.price DESC`;
    } else if (sortBy === 'recent') {
      query += ` ORDER BY s.date_added DESC`;
    } else if (sortBy === 'name_asc') {
      query += ` ORDER BY s.team ASC`;
    } else {
      query += ` ORDER BY s.date_added DESC`;
    }

    const [rows] = await pool.query(query, params);

    const shirtsWithRating = rows.map(shirt => ({
      ...shirt,
      average_rating: parseFloat(shirt.average_rating) || 0,
      comment_count: parseInt(shirt.comment_count) || 0
    }));

    res.status(200).json({
      success: true,
      count: shirtsWithRating.length,
      data: shirtsWithRating
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

exports.searchShirts = async (req, res) => {
  try {
    const { q } = req.query;

    if (!q) {
      return res.status(400).json({
        success: false,
        message: 'Parámetro de búsqueda requerido'
      });
    }

    const query = `
      SELECT
        s.id_shirts, s.season, s.league, s.team, s.brand, s.price, s.color, s.tipo, s.version,
        s.image_url, s.image_1, s.image_2, s.image_3, s.image_4, s.description,
        COALESCE(AVG(c.rating), 0) as average_rating,
        COUNT(c.id_comments) as comment_count
      FROM shirts s
      LEFT JOIN comments c ON s.id_shirts = c.shirt_id
      WHERE s.team LIKE ? OR s.league LIKE ?
      GROUP BY s.id_shirts
      ORDER BY s.date_added DESC
    `;

    const searchTerm = `%${q}%`;
    const [rows] = await pool.query(query, [searchTerm, searchTerm]);

    const shirtsWithRating = rows.map(shirt => ({
      ...shirt,
      average_rating: parseFloat(shirt.average_rating) || 0,
      comment_count: parseInt(shirt.comment_count) || 0
    }));

    res.status(200).json({
      success: true,
      count: shirtsWithRating.length,
      data: shirtsWithRating
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
