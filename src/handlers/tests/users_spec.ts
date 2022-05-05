import supertest from 'supertest';
import app from '../../server';

//supplying a token for testing purposes
const token = process.env.TESTING_TOKEN;

const request = supertest(app);
describe('Test user endpoint responses', () => {
    it('gets create endpoint', async() => {
        const response = await request
        .post('/user/create')
        expect(response.status).toBe(200);
    })
    it('gets authenticate endpoint', async() => {
        const response = await request
        .get('/user/authenticate')
        expect(response.status).toBe(403);
    })
    it('gets index endpoint', async() => {
        const response = await request
        .get('/user/index')
        .set({'Authorization': `Basic ${token}`});
        expect(response.status).toBe(200);
    })
    it('gets show endpoint', async() => {
        const response = await request
        .get('/user/show/1')
        .set({'Authorization': `Basic ${token}`});
        expect(response.status).toBe(200);
    })
});
