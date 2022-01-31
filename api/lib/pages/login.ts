
const login = (req:any, res:any, next:any) => {
  req.user ? res.redirect('/profile') : res.render('login');
};

export default login;
