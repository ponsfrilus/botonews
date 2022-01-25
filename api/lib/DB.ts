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
    let user:any = await getUserByEmail(email);
    if (user.length) {
        user = await updateUser(user[0].username, user[0].email, user[0].user);
    } else {
        user = await insertUser(username, email);
    }
    return user;
}

export const deleteUser = async (username:string) => {
    const [rows, fields] = await (await dbconnect).query(`DELETE FROM t_users WHERE username = ?`, [username]);
    return rows;
}

// Subscriptions
export const getSubscription = async (subscriptionId:string) => {
    const [rows, fields] = await (await dbconnect).query(`
            SELECT sub.subscription, usr.*, sub.modalities, sup.title AS support_title, sup.support, src.title AS source_title, src.source 
                FROM t_subscriptions sub
                LEFT JOIN t_users usr ON (usr.user = sub.user)
                LEFT JOIN t_supports sup ON (sup.support = sub.support)
                LEFT JOIN t_subscription_sources subsrc ON (subsrc.subscription = sub.subscription)
                LEFT JOIN t_sources src ON (src.source = subsrc.source)
            WHERE sub.subscription = ?
        `, [subscriptionId]);

    var rowscommon:any = rows

    var sources:any = [];
    rowscommon.forEach((e:any, i:any) => {
        sources.push({
            "id": e.source,
            "title": e.source_title
        })
    });
    
    var response:any = {
            "user": {
                "id": rowscommon[0].user,
                "username": rowscommon[0].username
            },
            "subscription": rowscommon[0].subscription,
            "support": {
                "id": rowscommon[0].support,
                "title": rowscommon[0].support_title
            },
            "modalities": rowscommon[0].modalities,
            "sources": sources
    };
    
    return response;
}

export const getAllSubscriptions = async (userId:string) => {
        const [rows, fields] = await (await dbconnect).query(`
            SELECT sub.subscription, usr.*, sub.modalities, sup.title AS support_title, sup.support, src.title AS source_title, src.source 
                FROM t_subscriptions sub
                LEFT JOIN t_users usr ON (usr.user = sub.user)
                LEFT JOIN t_supports sup ON (sup.support = sub.support)
                LEFT JOIN t_subscription_sources subsrc ON (subsrc.subscription = sub.subscription)
                LEFT JOIN t_sources src ON (src.source = subsrc.source)
            WHERE usr.user = ?
        `, [userId]);

    var rowscommon:any = rows

    var subscriptions:any = [];
    rowscommon.forEach((e:any, i:any) => {
        if (!subscriptions[e.subscription]) {
            subscriptions[e.subscription] = {
                "subscription": e.subscription,
                "support": {
                    "id": e.support,
                    "title": e.support_title
                },
                "modalities": e.modalities,
                "sources": [
                    {
                        "id": e.source,
                        "title": e.source_title
                    }
                ]
            };
        } else {
            subscriptions[e.subscription].sources.push(
                {
                    "id": e.source,
                    "title": e.source_title
                })
        }
    });
    // let's remove empty indexed entries
    subscriptions = subscriptions.filter((el:any) => { return el })
    var response:any = {
        "user": {
            "id": rowscommon[0].user,
            "username": rowscommon[0].username
        },
        "subscriptions": subscriptions
        
    };
    console.log(JSON.stringify(response, null, 2))

    return response;
}

export const insertSubscription = async (userId:string, support:string, modalities:JSON) => {
    let modalitiesTx = JSON.stringify(modalities)
    const [rows, fields] = await (await dbconnect).query(`INSERT INTO t_subscriptions (subscription, user, support, modalities) VALUES (NULL, ?, ?, ?); `, [userId, support, modalitiesTx]);
    return rows;
}

export const insertSubscriptionSources = async (subscriptionId:number, source:string) => {
    const [rows, fields] = await (await dbconnect).query(`INSERT INTO t_subscription_sources (subscription, source) VALUES (?, ?); `, [subscriptionId, source]);
    return rows;
}