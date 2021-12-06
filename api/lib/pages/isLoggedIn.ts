import * as dotenv from 'dotenv';
dotenv.config({ path: __dirname + '/.env' });

const isLoggedIn = (req:any, res:any, next:any) => {
  req.user ? next() : res.redirect('/login')
};

export default isLoggedIn;
