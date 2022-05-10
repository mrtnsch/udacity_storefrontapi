import {Order, OrderStore} from '../order';

const store = new OrderStore();

describe("Tests for order model", () => {
    const testOrder = {
      user_id: 1,
      status: "active"
      }

      it("Creating a Order should return the Order", async () => {
          const result = await store.create(testOrder);
          expect(typeof result.user_id).toBe("string");
      })
      it("Requesting user id 1 created should return a Order", async () => {
        const result = await store.showCurrentOrderOfUser(testOrder.user_id);
        expect(typeof result.status).toBe("string");
        })
        it("Adding products to order should return the entry from the order_products table",async ()=> {
            const result = await store.addProductToOrder(1,1,1);
            expect(typeof result.id).toBe("number");
        })
})