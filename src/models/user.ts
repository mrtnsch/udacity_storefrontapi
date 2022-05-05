import bcrypt from 'bcrypt';
//@ts-ignore
import Client from '../database';

const {BCRYPT_PASSWORD,SALT_ROUNDS} = process.env;

const pepper = BCRYPT_PASSWORD;
const saltRounds = parseInt(SALT_ROUNDS as string);

export type User = {
    id?: Number;
    firstname: string;
    lastname:string;
    password:string
}

export class UserStore {
    async create(u:User): Promise<User> {
        try {
            //@ts-ignore
        const conn =  await Client.connect();
        const sql = 'INSERT INTO users (firstname, lastname, password_digest) VALUES($1, $2, $3) RETURNING *'
        const hash = await bcrypt.hash(
            u.password + pepper,
            saltRounds);
        const result = await conn
            .query(sql, [u.firstname,u.lastname,hash])
        conn.release();
        return result.rows[0];
        } catch (err) {
            throw new Error(`Failed to create new user ${u.firstname} ${u.lastname}. Error: ${err}`);
        }
    }
    async authenticate(firstname: string, lastname:string, password: string): Promise<User | null> {
        try {
        //@ts-ignore
        const conn = await Client.connect()
        const sql = 'SELECT password_digest FROM users WHERE firstname=($1) AND lastname=($2)'
    
        const result = await conn.query(sql, [firstname,lastname])
        conn.release();
        if(result.rows.length) {
    
          const user = result.rows[0]
    
          if (await bcrypt.compare(password+pepper, user.password_digest)) {
            return user
          }
        }
    
        return null
    } catch (err) {
        throw new Error(`Failed to authenthicate. Error: ${err}`);
    }
      }

    async index(): Promise<User[]> {
        try {
        //@ts-ignore
        const conn = await Client.connect();
        const sql = 'SELECT firstname, lastname, id from users';

        const result = await conn.query(sql);
        conn.release();
        return result.rows;

    } catch (err) {
        throw new Error(`Failed to retrieve users. Error: ${err}`);
    }
}
    async show(id: number): Promise<User> {
        try {
            //@ts-ignore
            const conn = await Client.connect()
            const sql = 'SELECT firstname, lastname, id FROM users WHERE id=($1)'
        
            const result = await conn.query(sql, [id])
            conn.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`Failed to retrieve user with id ${id}. Error: ${err}`)
    }
}
}