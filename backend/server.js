const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const SHIRTS_FILE = path.join(__dirname, 'data', 'shirts.json');

async function readShirts() {
    const data = await fs.readFile(SHIRTS_FILE, 'utf8');
    return JSON.parse(data);
}

async function writeShirts(shirts) {
    await fs.writeFile(SHIRTS_FILE, JSON.stringify(shirts, null, 2));
}

app.get('/api/shirts', async (req, res) => {
    try {
        const shirts = await readShirts();
        res.json(shirts);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las camisetas' });
    }
});

app.get('/api/shirts/:id', async (req, res) => {
    try {
        const shirts = await readShirts();
        const shirt = shirts.find(s => s.id === parseInt(req.params.id));
        
        if (!shirt) {
            return res.status(404).json({ error: 'Camiseta no encontrada' });
        }
        
        res.json(shirt);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener la camiseta' });
    }
});

app.post('/api/shirts', async (req, res) => {
    try {
        const shirts = await readShirts();
        const newShirt = {
            id: shirts.length > 0 ? Math.max(...shirts.map(s => s.id)) + 1 : 1,
            ...req.body
        };
        
        shirts.push(newShirt);
        await writeShirts(shirts);
        
        res.status(201).json(newShirt);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear la camiseta' });
    }
});

app.put('/api/shirts/:id', async (req, res) => {
    try {
        const shirts = await readShirts();
        const index = shirts.findIndex(s => s.id === parseInt(req.params.id));
        
        if (index === -1) {
            return res.status(404).json({ error: 'Camiseta no encontrada' });
        }
        
        shirts[index] = { ...shirts[index], ...req.body, id: parseInt(req.params.id) };
        await writeShirts(shirts);
        
        res.json(shirts[index]);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar la camiseta' });
    }
});

app.delete('/api/shirts/:id', async (req, res) => {
    try {
        const shirts = await readShirts();
        const filteredShirts = shirts.filter(s => s.id !== parseInt(req.params.id));
        
        if (shirts.length === filteredShirts.length) {
            return res.status(404).json({ error: 'Camiseta no encontrada' });
        }
        
        await writeShirts(filteredShirts);
        res.json({ message: 'Camiseta eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar la camiseta' });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
