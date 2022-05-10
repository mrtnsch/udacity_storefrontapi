"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../../server"));
const request = (0, supertest_1.default)(server_1.default);
let token;
describe('Test user endpoint responses', () => {
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
            .post('/user/create');
        expect(response.status).toBe(200);
    });
    it('gets authenticate endpoint', async () => {
        const response = await request
            .get('/user/authenticate');
        expect(response.status).toBe(403);
    });
    it('gets index endpoint', async () => {
        const response = await request
            .get('/user/index')
            .set({ 'Authorization': `Basic ${token}` });
        expect(response.status).toBe(200);
    });
    it('gets show endpoint', async () => {
        const response = await request
            .get('/user/show/1')
            .set({ 'Authorization': `Basic ${token}` });
        expect(response.status).toBe(200);
    });
});
