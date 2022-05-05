import supertest from 'supertest';
import app from '../../server';

//supplying a token for testing purposes
const token = process.env.TESTING_TOKEN;

const request = supertest(app);
describe('Test product endpoint responses', () => {
    it('gets create product endpoint', async() => {
        const response = await request
        .post('/product/create')
        .set({'Authorization': `Basic ${token}`});
        expect(response.status).toBe(200);
    })
    it('gets show endpoint', async() => {
        const response = await request
        .get('/product/show/1');
        expect(response.status).toBe(200);
    })
    it('gets products index endpoint', async() => {
        const response = await request
        .get('/product/index');
        expect(response.status).toBe(200);
    })
    it('gets product category endpoint', async() => {
        const response = await request
        .get('/product/Garden');
        expect(response.status).toBe(200);
    })
});
