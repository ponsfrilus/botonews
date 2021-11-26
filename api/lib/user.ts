import { NextFunction, Request, Response } from 'express';
import mysql from 'mysql2';
import * as dotenv from 'dotenv';
dotenv.config({ path: __dirname + '/.env' });
var hash = require('blueimp-md5');

const user = async (req: Request, res: Response, next: NextFunction) => {
  const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: process.env.DB_NAME,
  });

  switch (req.method) {
    case 'GET':
      var error =
        '{\
            "status_code": 400,\
            "error": "Please specify a username or an id."\
        }';
      if (!req.query.username && !req.query.id) return res.status(400) && res.send(JSON.parse(error));

      var where;
      var param;

      if (req.query.id) {
        where = 'user';
        param = parseInt(req.query.id as string);
      }
      if (req.query.username) {
        where = 'username';
        param = req.query.username;
      }
      db.execute(
        `SELECT * FROM t_users WHERE ${where} = ? LIMIT 1`,
        [param],
        async function (err, results, fields) {
          if (err) return res.send(err);
          res.send(results);
          next();
        }
      );
      break;
    case 'POST':
      var error =
        '{\
            "status_code": 400,\
            "error": "Please specify a username and email."\
        }';
      if (!req.body || !req.body.username || !req.body.email) {
        return res.status(400) && res.send(JSON.parse(error));
      }
      let hashedEmail = hash(req.body.email);
      db.execute(
        `INSERT INTO t_users VALUES (NULL, ? , ?, 'https://www.gravatar.com/avatar/${hashedEmail}?s=300&d=mp')`,
        [req.body.username, req.body.email],
        async function (err, results, fields) {
          if (err) return res.send(err);
          res.status(201);
          res.send(results);
          next();
        }
      );
      break;
    case 'DELETE':
      var error =
        '{\
            "status_code": 400,\
            "error": "Please specify a username."\
        }';
      if (!req.body.username) return res.status(400) && res.send(JSON.parse(error));
      db.execute(
        `DELETE FROM t_users WHERE username = ?`,
        [req.body.username],
        async function (err, results, fields) {
          if (err) return res.send(err);
          res.send(results);
          next();
        }
      );
      break;
  }
};

export default user;
