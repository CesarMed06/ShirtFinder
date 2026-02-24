const pool = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { sendResetEmail } = require('../utils/mailer');  

exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Todos los campos son obligatorios'
      });
    }

    const [existingUser] = await pool.query(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );

    if (existingUser.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Email ya registrado'
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.query(
      'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
      [username, email, hashedPassword]
    );

    res.status(201).json({
      success: true,
      message: 'Usuario registrado correctamente'
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email y contraseña son obligatorios'
      });
    }

    const [users] = await pool.query(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );

    if (users.length === 0) {
      return res.status(401).json({
        success: false,
        message: 'Credenciales inválidas'
      });
    }

    const user = users[0];

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Credenciales inválidas'
      });
    }

    const token = jwt.sign(
      { id: user.id_users },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    );

    res.status(200).json({
      success: true,
      token,
      user: {
        id: user.id_users,
        username: user.username,
        email: user.email
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getMe = async (req, res) => {
  try {
    const [users] = await pool.query(
      'SELECT id_users, username, email, user_type, date_registered FROM users WHERE id_users = ?',
      [req.user.id]
    );

    if (users.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Usuario no encontrado'
      });
    }

    res.status(200).json({
      success: true,
      user: users[0]
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.forgotPassword = async (req, res) => {
    console.log('>>> forgotPassword llamado con:', req.body);
    try {
        const { email } = req.body;

        if (!email) return res.status(400).json({ success: false, message: 'Email requerido' });

        const [users] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);

        if (users.length === 0) {
            return res.json({ success: true, message: 'Si el correo existe, recibirás un enlace' });
        }

        const token = crypto.randomBytes(32).toString('hex');
        const expiresAt = new Date(Date.now() + 60 * 60 * 1000);

        await pool.query('DELETE FROM password_resets WHERE email = ?', [email]);
        await pool.query(
            'INSERT INTO password_resets (email, token, expires_at) VALUES (?, ?, ?)',
            [email, token, expiresAt]
        );

        await sendResetEmail(email, token);

        res.json({ success: true, message: 'Si el correo existe, recibirás un enlace' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al procesar la solicitud' });
    }
};

exports.resetPassword = async (req, res) => {
    try {
        const { token, password } = req.body;
        if (!token || !password) return res.status(400).json({ success: false, message: 'Datos incompletos' });

        const [resets] = await pool.query(
            'SELECT * FROM password_resets WHERE token = ? AND expires_at > NOW()',
            [token]
        );

        if (resets.length === 0) {
            return res.status(400).json({ success: false, message: 'Token inválido o expirado' });
        }

        const { email } = resets[0];
        const hashedPassword = await bcrypt.hash(password, 10);

        await pool.query('UPDATE users SET password = ? WHERE email = ?', [hashedPassword, email]);
        await pool.query('DELETE FROM password_resets WHERE token = ?', [token]);

        res.json({ success: true, message: 'Contraseña actualizada correctamente' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al actualizar contraseña' });
    }
};

