"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../../server"));
//supplying a token for testing purposes
let token;
const request = (0, supertest_1.default)(server_1.default);
describe('Test product endpoint responses', () => {
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
    it('gets create product endpoint', async () => {
        const response = await request
            .post('/product/create')
            .set({ 'Authorization': `Basic ${token}` });
        expect(response.status).toBe(200);
    });
    it('gets show endpoint', async () => {
        const response = await request
            .get('/product/show/1');
        expect(response.status).toBe(200);
    });
    it('gets products index endpoint', async () => {
        const response = await request
            .get('/product/index');
        expect(response.status).toBe(200);
    });
    it('gets product category endpoint', async () => {
        const response = await request
            .get('/product/Garden');
        expect(response.status).toBe(200);
    });
});
