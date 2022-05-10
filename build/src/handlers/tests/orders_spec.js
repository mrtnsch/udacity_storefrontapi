"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../../server"));
let token;
const request = (0, supertest_1.default)(server_1.default);
describe('Test order endpoint responses', () => {
    beforeAll(async () => {
        //create a test user and store the JWT in a variable
        const testUser = {
            firstname: "Sepp",
            lastname: "Kraxler",
            password: "password123"
        };
        const response = await request
            .post('/user/create')
            .send(testUser);
        token = response.body.token;
    });
    it('gets create endpoint', async () => {
        const response = await request
            .post('/order/create')
            .set({ 'Authorization': `Basic ${token}` });
        expect(response.status).toBe(200);
    });
    it('gets show endpoint', async () => {
        const response = await request
            .get('/order/show/1');
        expect(response.status).toBe(200);
    });
    it('gets show orders by user id endpoint', async () => {
        const response = await request
            .get('/order/showCurrentOrderOfUser/1');
        expect(response.status).toBe(200);
    });
    it('gets add product to order endpoint', async () => {
        const response = await request
            .post('/order/addProductToOrder');
        expect(response.status).toBe(200);
    });
});
