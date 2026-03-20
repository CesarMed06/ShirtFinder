require('dotenv').config();
const express = require('express');
const cors = require('cors');
const pool = require('./config/db');

const app = express();

app.use(cors());
app.use(express.json());

const authRoutes = require('./routes/auth');
const shirtRoutes = require('./routes/shirts');
const commentRoutes = require('./routes/commentRoutes');
const userRoutes = require('./routes/userRoutes');
const favoriteRoutes = require('./routes/favoriteRoutes');
const postRoutes = require('./routes/postRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/shirts', shirtRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/users', userRoutes);
app.use('/api/favorites', favoriteRoutes);
app.use('/api/posts', postRoutes);
app.use('/uploads', express.static('uploads'));

async function runMigrations() {
    try {
        const [cols] = await pool.query("SHOW COLUMNS FROM users LIKE 'avatar_url'");
        if (cols.length === 0) {
            await pool.query('ALTER TABLE users ADD COLUMN avatar_url VARCHAR(500) DEFAULT NULL');
        }
        await pool.query(`
            CREATE TABLE IF NOT EXISTS posts (
                id INT PRIMARY KEY AUTO_INCREMENT,
                title VARCHAR(255) NOT NULL,
                content TEXT NOT NULL,
                category VARCHAR(100) DEFAULT 'General',
                user_id INT NOT NULL,
                attachment_url VARCHAR(500) DEFAULT NULL,
                replies_count INT DEFAULT 0,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id_users) ON DELETE CASCADE
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
        `);
    } catch (err) {
        console.error('[Migration] Error:', err.message);
    }
}

if (require.main === module) {
    runMigrations().then(() => {
        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => {
            console.log(`Servidor corriendo en http://localhost:${PORT}`);
        });
    });
}

module.exports = app;
