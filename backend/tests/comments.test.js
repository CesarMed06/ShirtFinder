const request = require('supertest');
const app = require('../server');
const pool = require('../config/db');
const jwt = require('jsonwebtoken');

jest.mock('../config/db');

const token = jwt.sign({ id: 1 }, process.env.JWT_SECRET || 'test_secret', { expiresIn: '1h' });

describe('GET /api/comments/:shirtId', () => {
    it('devuelve comentarios de una camiseta', async () => {
        pool.query.mockResolvedValueOnce([[{ id_comments: 1, text: 'Buena camiseta', rating: 5 }]]);
        const res = await request(app).get('/api/comments/1');
        expect(res.status).toBe(200);
    });
});

describe('POST /api/comments/:shirtId', () => {
    it('crea comentario con token válido', async () => {
        pool.query
            .mockResolvedValueOnce([{ insertId: 1 }])
            .mockResolvedValueOnce([[{ id_comments: 1, text: 'Buena', rating: 5, date: new Date(), username: 'test' }]]);
        const res = await request(app)
            .post('/api/comments/1')
            .set('Authorization', `Bearer ${token}`)
            .send({ text: 'Buena camiseta', rating: 5 });
        expect(res.status).toBe(201);
    });

    it('falla sin token', async () => {
        const res = await request(app).post('/api/comments/1').send({ text: 'Test' });
        expect(res.status).toBe(401);
    });

    it('falla si faltan campos', async () => {
        const res = await request(app)
            .post('/api/comments/1')
            .set('Authorization', `Bearer ${token}`)
            .send({ rating: 5 });
        expect(res.status).toBe(400);
    });
});

describe('DELETE /api/comments/:commentId', () => {
    it('borra comentario si el usuario es el dueño', async () => {
        pool.query
            .mockResolvedValueOnce([[{ id_comments: 1, user_id: 1 }]])
            .mockResolvedValueOnce([{}]);
        const res = await request(app)
            .delete('/api/comments/1')
            .set('Authorization', `Bearer ${token}`);
        expect(res.status).toBe(200);
    });

    it('falla sin token', async () => {
        const res = await request(app).delete('/api/comments/1');
        expect(res.status).toBe(401);
    });
});
