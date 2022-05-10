"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../user");
const store = new user_1.UserStore();
describe("Tests for user model", () => {
    const testUser = {
        firstname: "Sepp",
        lastname: "Kraxler",
        password: "password123"
    };
    it("Authenticating should return the user", async () => {
        const result = await store.authenticate(testUser.firstname, testUser.lastname, testUser.password);
        expect(result).not.toBeNull();
    });
    it("Requesting id created should return an user", async () => {
        const result = await store.show(1);
        expect(typeof result.firstname).toBe("string");
        expect(typeof result.lastname).toBe("string");
    });
    it("Calling index should return an array", async () => {
        const result = await store.index();
        expect(Array.isArray(result)).toBe(true);
        expect(typeof result[0].firstname).toBe("string");
        expect(typeof result[0].lastname).toBe("string");
    });
    it("Creating an user should return the user", async () => {
        const result = await store.create(testUser);
        expect(result.firstname).toEqual(testUser.firstname);
        expect(result.lastname).toEqual(testUser.lastname);
    });
});
