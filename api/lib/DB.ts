import mysql from 'mysql2/promise';
import * as dotenv from 'dotenv';
dotenv.config({ path: __dirname + '/.env' });

const dbconnect = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: process.env.DB_NAME,
});

export const getUserByID = async (id:number) => {
    const [rows, fields] = await (await dbconnect).query(`SELECT * FROM t_users WHERE user = ? LIMIT 1`, [id]);
    return rows;
}

export const getUserByUsername = async (username:string) => {
    const [rows, fields] = await (await dbconnect).query(`SELECT * FROM t_users WHERE username = ? LIMIT 1`, [username]);
    return rows;
}

export const getUserByEmail = async (email:string) => {
    const [rows, fields] = await (await dbconnect).query(`SELECT * FROM t_users WHERE email = ? LIMIT 1`, [email]);
    return rows;
}

export const insertUser = async (username:string, email:string) => {
    const [rows, fields] = await (await dbconnect).query(`INSERT INTO t_users VALUES (NULL, ? , ?)`, [username, email]);
    return rows;
}

export const updateUser = async (username:string, email:string, id:number) => {
    const [rows, fields] = await (await dbconnect).query(`UPDATE t_users SET username = ?, email = ? WHERE user = ?`, [username, email, id]);
    return rows;
}

export const replaceUser = async (username:string, email:string) => {
    let user:any = await getUserByEmail(email)
    if (user.length) {
        user = await updateUser(user[0].username, user[0].email, user[0].user)
    } else {
        user = await insertUser(username, email)
    }
    return user;
}

export const deleteUser = async (username:string) => {
    const [rows, fields] = await (await dbconnect).query(`DELETE FROM t_users WHERE username = ?`, [username]);
    return rows;
}