"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderStore = void 0;
//@ts-ignore
const database_1 = __importDefault(require("../database"));
class OrderStore {
    async create(o) {
        try {
            //@ts-ignore
            const conn = await database_1.default.connect();
            const sql = 'INSERT INTO orders (user_id, status) VALUES($1, $2) RETURNING *';
            const result = await conn
                .query(sql, [o.user_id, o.status]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Failed to create new order. Error: ${err}`);
        }
    }
    async showCurrentOrderOfUser(user_id) {
        try {
            //@ts-ignore
            const conn = await database_1.default.connect();
            //add: products in the order
            const sql = 'SELECT id, user_id, status FROM orders WHERE user_id=($1) AND status=($2) LIMIT 1';
            const result = await conn.query(sql, [user_id, "active"]);
            const sqlProducts = 'SELECT product_id, quantity FROM order_products WHERE order_id=($1)';
            const resultProducts = await conn.query(sqlProducts, [result.rows[0].id]);
            const returnOrder = result.rows[0];
            returnOrder.products = resultProducts.rows[0];
            conn.release();
            return returnOrder;
        }
        catch (err) {
            throw new Error(`Failed to retrieve orders of user with id ${user_id}. Error: ${err}`);
        }
    }
    async show(id) {
        try {
            //@ts-ignore
            const conn = await database_1.default.connect();
            const sql = 'SELECT id, user_id, status FROM orders WHERE id=($1)';
            const result = await conn.query(sql, [id]);
            const sqlProducts = 'SELECT product_id, quantity FROM order_products WHERE order_id=($1)';
            const resultProducts = await conn.query(sqlProducts, [result.rows[0].id]);
            conn.release();
            const returnOrder = result.rows[0];
            returnOrder.products = resultProducts.rows[0];
            return returnOrder;
        }
        catch (err) {
            throw new Error(`Failed to retrieve order with id ${id}. Error: ${err}`);
        }
    }
    async addProductToOrder(quantity, orderId, product_id) {
        try {
            //@ts-ignore
            const conn = await database_1.default.connect();
            const sql = 'INSERT INTO order_products (quantity, order_id, product_id) VALUES ($1,$2,$3) RETURNING *';
            const result = await conn.query(sql, [quantity, orderId, product_id]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Failed to add product ${product_id} to order ${orderId}. Error: ${err}`);
        }
    }
}
exports.OrderStore = OrderStore;
