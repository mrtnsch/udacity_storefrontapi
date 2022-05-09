import supertest from 'supertest';
import app from '../../server';

let token:string;

const request = supertest(app);
describe('Test order endpoint responses', () => {
    beforeAll(async () => {
        //create a test user and store the JWT in a variable
        const testUser = {
            firstname: "Sepp",
             lastname: "Kraxler",
             password:"password123"
            }
            
            const response = await request
            .post('/user/create')
            .send(testUser)
        token = response.body.token;
    })

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
