//@ts-ignore
import Client from '../database';

export type Product = {
    id?: Number;
    name: string;
    price:Number;
    category?:string
}

export class ProductStore {
    async create(p:Product): Promise<Product> {
        try {
            //@ts-ignore
        const conn =  await Client.connect();
        const sql = 'INSERT INTO products (name, price, category) VALUES($1, $2, $3) RETURNING *'
        
        const result = await conn
            .query(sql, [p.name, p.price, p.category])
        conn.release();
        return result.rows[0];
        } catch (err) {
            throw new Error(`Failed to create new user ${p.name}. Error: ${err}`);
        }
    }

    async index(): Promise<Product[]> {
        try {
        //@ts-ignore
        const conn = await Client.connect();
        const sql = 'SELECT name, price, category, id FROM products';

        const result = await conn.query(sql);
        conn.release();
        return result.rows;

    } catch (err) {
        throw new Error(`Failed to retrieve products. Error: ${err}`);
    }
}
    async show(id: number): Promise<Product> {
        try {
            //@ts-ignore
            const conn = await Client.connect()
            const sql = 'SELECT name, price, category, id FROM products WHERE id=($1)'
        
            const result = await conn.query(sql, [id])
            conn.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`Failed to retrieve product with id ${id}. Error: ${err}`)
    }
}
// Top five method - can be implemented later
// async topFive(): Promise<Product> {
//     try {
//         //@ts-ignore
//         const conn = await Client.connect()
//         
//     } catch (err) {
//         throw new Error(`Failed to retrieve product with id ${id}. Error: ${err}`)
// }
// }

async showByCategory(category:string): Promise<Product[]> {
    try {
        //@ts-ignore
        const conn = await Client.connect()
        const sql = 'SELECT name, price, category, id FROM products WHERE category=($1)'
    
        const result = await conn.query(sql, [category])
        conn.release();
        return result.rows;
    } catch (err) {
        throw new Error(`Failed to retrieve products from category ${category}. Error: ${err}`)
}
}
}