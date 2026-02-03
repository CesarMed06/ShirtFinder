require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Rutas
const authRoutes = require('./routes/auth');
const shirtRoutes = require('./routes/shirts');

app.use('/api/auth', authRoutes);
app.use('/api/shirts', shirtRoutes);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
