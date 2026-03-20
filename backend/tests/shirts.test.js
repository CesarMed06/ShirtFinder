const request = require('supertest');
const app = require('../server');
const pool = require('../config/db');

jest.mock('../config/db');

const mockShirts = [
    { id: 1, team: 'Real Madrid', league: 'LaLiga', season: '2023-24' },
    { id: 2, team: 'Barcelona', league: 'LaLiga', season: '2023-24' }
];

describe('GET /api/shirts', () => {
    it('devuelve lista de camisetas', async () => {
        pool.query.mockResolvedValueOnce([mockShirts]);

        const res = await request(app).get('/api/shirts');
        expect(res.status).toBe(200);
    });

    it('acepta filtros por query params', async () => {
        pool.query.mockResolvedValueOnce([[mockShirts[0]]]);

        const res = await request(app).get('/api/shirts?league=LaLiga&team=Real Madrid');
        expect(res.status).toBe(200);
    });
});

describe('GET /api/shirts/:id', () => {
    it('devuelve una camiseta por id', async () => {
        pool.query.mockResolvedValueOnce([[mockShirts[0]]]);

        const res = await request(app).get('/api/shirts/1');
        expect(res.status).toBe(200);
    });

    it('devuelve 404 si no existe', async () => {
        pool.query.mockResolvedValueOnce([[]]);

        const res = await request(app).get('/api/shirts/9999');
        expect(res.status).toBe(404);
    });
});
