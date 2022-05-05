import supertest from 'supertest';
import app from '../../server';

//supplying a token for testing purposes
const token = process.env.TESTING_TOKEN;

const request = supertest(app);
describe('Test order endpoint responses', () => {
    it('gets create endpoint', async() => {
        const response = await request
        .post('/order/create')
        .set({'Authorization': `Basic ${token}`});
        expect(response.status).toBe(200);
    })
    it('gets show endpoint', async() => {
        const response = await request
        .get('/order/show/1');
        expect(response.status).toBe(200);
    })
    it('gets show orders by user id endpoint', async() => {
        const response = await request
        .get('/order/showCurrentOrderOfUser/1');
        expect(response.status).toBe(200);
    })
    it('gets add product to order endpoint', async() => {
        const response = await request
        .post('/order/addProductToOrder');
        expect(response.status).toBe(200);
    })
});
