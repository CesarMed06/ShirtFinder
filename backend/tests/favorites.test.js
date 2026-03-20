const request = require('supertest');
const app = require('../server');
const pool = require('../config/db');
const jwt = require('jsonwebtoken');

jest.mock('../config/db');

const token = jwt.sign({ id: 1 }, process.env.JWT_SECRET || 'test_secret', { expiresIn: '1h' });

describe('GET /api/favorites', () => {
    it('devuelve favoritos del usuario', async () => {
        pool.query.mockResolvedValueOnce([[{ shirt_id: 1 }]]);
        const res = await request(app).get('/api/favorites').set('Authorization', `Bearer ${token}`);
        expect(res.status).toBe(200);
    });

    it('falla sin token', async () => {
        const res = await request(app).get('/api/favorites');
        expect(res.status).toBe(401);
    });
});

describe('POST /api/favorites/:shirtId', () => {
    it('añade un favorito', async () => {
        pool.query
            .mockResolvedValueOnce([[]])
            .mockResolvedValueOnce([{ insertId: 1 }]);
        const res = await request(app)
            .post('/api/favorites/1')
            .set('Authorization', `Bearer ${token}`);
        expect(res.status).toBe(200);
    });

    it('falla sin token', async () => {
        const res = await request(app).post('/api/favorites/1');
        expect(res.status).toBe(401);
    });
});

describe('DELETE /api/favorites/:shirtId', () => {
    it('elimina un favorito', async () => {
        pool.query.mockResolvedValueOnce([{ affectedRows: 1 }]);
        const res = await request(app)
            .delete('/api/favorites/1')
            .set('Authorization', `Bearer ${token}`);
        expect(res.status).toBe(200);
    });

    it('falla sin token', async () => {
        const res = await request(app).delete('/api/favorites/1');
        expect(res.status).toBe(401);
    });
});
