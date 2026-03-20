const request = require('supertest');
const app = require('../server');
const pool = require('../config/db');
const bcrypt = require('bcryptjs');

jest.mock('../config/db');
jest.mock('../utils/mailer', () => ({ sendResetEmail: jest.fn() }));

const hashed = bcrypt.hashSync('password123', 10);

describe('POST /api/auth/register', () => {
    it('registra un usuario correctamente', async () => {
        pool.query
            .mockResolvedValueOnce([[]])
            .mockResolvedValueOnce([{ insertId: 1 }]);

        const res = await request(app).post('/api/auth/register').send({
            username: 'test',
            email: 'test@test.com',
            password: 'password123'
        });

        expect(res.status).toBe(201);
        expect(res.body.success).toBe(true);
    });

    it('falla si faltan campos', async () => {
        const res = await request(app).post('/api/auth/register').send({ email: 'test@test.com' });
        expect(res.status).toBe(400);
    });

    it('falla si el email ya existe', async () => {
        pool.query.mockResolvedValueOnce([[{ id_users: 1 }]]);

        const res = await request(app).post('/api/auth/register').send({
            username: 'test',
            email: 'existe@test.com',
            password: 'password123'
        });

        expect(res.status).toBe(400);
    });
});

describe('POST /api/auth/login', () => {
    it('hace login y devuelve token', async () => {
        pool.query.mockResolvedValueOnce([[{ id_users: 1, email: 'test@test.com', username: 'test', password: hashed }]]);

        const res = await request(app).post('/api/auth/login').send({
            email: 'test@test.com',
            password: 'password123'
        });

        expect(res.status).toBe(200);
        expect(res.body.token).toBeDefined();
    });

    it('falla con email inexistente', async () => {
        pool.query.mockResolvedValueOnce([[]]);

        const res = await request(app).post('/api/auth/login').send({
            email: 'noexiste@test.com',
            password: 'password123'
        });

        expect(res.status).toBe(401);
    });

    it('falla con contraseña incorrecta', async () => {
        pool.query.mockResolvedValueOnce([[{ id_users: 1, email: 'test@test.com', password: hashed }]]);

        const res = await request(app).post('/api/auth/login').send({
            email: 'test@test.com',
            password: 'wrongpassword'
        });

        expect(res.status).toBe(401);
    });
});
