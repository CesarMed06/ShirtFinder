const pool = require('../config/db');

exports.getCommentsByShirt = async (req, res) => {
  try {
    const { shirtId } = req.params;

    const [comments] = await pool.query(
      `SELECT c.id_comments, c.text, c.rating, c.date, u.username
      FROM comments c
      JOIN users u ON c.user_id = u.id_users
      WHERE c.shirt_id = ?
      ORDER BY c.date DESC`,
      [shirtId]
    );

    const commentsWithRating = comments.map(c => ({
      ...c,
      rating: parseFloat(c.rating) || 0
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

    if (!text || text.trim() === '') {
      return res.status(400).json({ success: false, message: 'El comentario no puede estar vacío' });
    }

    const ratingValue = parseFloat(rating) || 0;

    const [result] = await pool.query(
      'INSERT INTO comments (shirt_id, user_id, text, rating) VALUES (?, ?, ?, ?)',
      [shirtId, userId, text, ratingValue]
    );

    const [newComment] = await pool.query(
      `SELECT c.id_comments, c.text, c.rating, c.date, u.username
      FROM comments c
      JOIN users u ON c.user_id = u.id_users
      WHERE c.id_comments = ?`,
      [result.insertId]
    );

    const commentWithRating = {
      ...newComment[0],
      rating: parseFloat(newComment[0].rating) || 0
    };

    res.status(201).json({ success: true, data: commentWithRating });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
