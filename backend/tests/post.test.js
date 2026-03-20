const request = require('supertest');
const app = require('../server');
const pool = require('../config/db');
const jwt = require('jsonwebtoken');

jest.mock('../config/db');

const token = jwt.sign({ id: 1 }, process.env.JWT_SECRET || 'test_secret', { expiresIn: '1h' });

const mockPost = { id: 1, title: 'Test', content: 'Contenido', user_id: 1, replies_count: 0, created_at: new Date() };

describe('GET /api/posts', () => {
    it('devuelve lista de posts', async () => {
        pool.query.mockResolvedValueOnce([[mockPost]]);
        const res = await request(app).get('/api/posts');
        expect(res.status).toBe(200);
    });
});

describe('GET /api/posts/:id', () => {
    it('devuelve un post por id', async () => {
        pool.query.mockResolvedValueOnce([[mockPost]]);
        const res = await request(app).get('/api/posts/1');
        expect(res.status).toBe(200);
    });

    it('devuelve 404 si no existe', async () => {
        pool.query.mockResolvedValueOnce([[]]);
        const res = await request(app).get('/api/posts/9999');
        expect(res.status).toBe(404);
    });
});

describe('POST /api/posts', () => {
    it('crea post con token válido', async () => {
        pool.query.mockResolvedValueOnce([{ insertId: 1 }]);
        const res = await request(app)
            .post('/api/posts')
            .set('Authorization', `Bearer ${token}`)
            .send({ title: 'Test', content: 'Contenido', category: 'General' });
        expect(res.status).toBe(201);
    });

    it('falla sin token', async () => {
        const res = await request(app).post('/api/posts').send({ title: 'Test', content: 'Contenido' });
        expect(res.status).toBe(401);
    });

    it('falla si faltan campos', async () => {
        const res = await request(app)
            .post('/api/posts')
            .set('Authorization', `Bearer ${token}`)
            .send({ title: 'Solo titulo' });
        expect(res.status).toBe(400);
    });
});

describe('DELETE /api/posts/:id', () => {
    it('borra el post si el usuario es el dueño', async () => {
        pool.query
            .mockResolvedValueOnce([[{ user_id: 1 }]])
            .mockResolvedValueOnce([{}])
            .mockResolvedValueOnce([{}]);
        const res = await request(app)
            .delete('/api/posts/1')
            .set('Authorization', `Bearer ${token}`);
        expect(res.status).toBe(200);
    });

    it('falla sin token', async () => {
        const res = await request(app).delete('/api/posts/1');
        expect(res.status).toBe(401);
    });

    it('falla si el post no es del usuario', async () => {
        pool.query.mockResolvedValueOnce([[{ user_id: 99 }]]);
        const res = await request(app)
            .delete('/api/posts/1')
            .set('Authorization', `Bearer ${token}`);
        expect(res.status).toBe(403);
    });
});
