const passport = require("passport");
import home from '../lib/pages/Home';
import profile from '../lib/pages/profile';
import isLoggedIn from '../lib/pages/isLoggedIn';
import login from '../lib/pages/login';
import respond from '../lib/Respond';
import news from '../lib/News';
import user from '../lib/User'
import user_edit from '../lib/User_edit';
export class ApiRoutes {
  server: any;
  constructor(server: any) {
    this.server = server;
  }

  listen() {
    this.server.get('/', home);
    this.server.get('/hello/:name', respond);
    this.server.head('/hello/:name', respond);
    this.server.get('/news', news);
    this.server.get('/user', user);
    this.server.post('/user', user);
    this.server.post('/user/edit', user_edit);
    this.server.delete('/user', user);
    this.server.get('/profile', isLoggedIn, profile)
    this.server.get('/login', login)
    this.server.get('/auth/google',
      passport.authenticate('google', { scope: ['email', 'profile'] })
    )
    this.server.get('/google/callback',
      passport.authenticate('google', {
        successRedirect: '/profile',
        failureRedirect: '/profile',
      })
    )
    this.server.get('/auth/github',
    passport.authenticate('github', { scope: ['user:email'] })
    )
    this.server.get('/github/callback',
    passport.authenticate('github', {
      successRedirect: '/profile',
      failureRedirect: '/profile',
      scope: ['user:email']
      })
    )
    this.server.get('/auth/failure', (req:any, res:any) => {
      res.send('something went wrong..');
    })
    this.server.get('/logout', function(req:any, res:any){
      req.logout();
      res.redirect('/');
    });
  }
}
