import {Product, ProductStore} from '../product';

const store = new ProductStore();

describe("Tests for Product model", () => {
    const testProduct = {
      name: "testproduct1",
      price: 14.20,
      category:"Living"
      }

 
      it("Requesting id created should return a product", async () => {
        const result = await store.show(1);
        expect(typeof result.name).toBe("string");
        })
        it("Calling index should return an array",async ()=> {
            const result = await store.index();
            expect(Array.isArray(result)).toBe(true);
            expect(typeof result[0].name).toBe("string");
        })
        it("Creating a product should return the product", async () => {
            const result = await store.create(testProduct);
            expect(result.name).toEqual(testProduct.name);
        })
        it("Calling showbycategory should return an array, category should be the one returned",async ()=> {
            const result = await store.showByCategory("Garden");
            expect(Array.isArray(result)).toBe(true);
            expect(result[0].category).toBe("Garden");
        })
})