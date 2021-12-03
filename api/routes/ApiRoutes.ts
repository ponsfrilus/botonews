const passport = require("passport");
function isLoggedIn(req:any, res:any, next:any) {
  req.user ? next() : res.sendStatus(401);
}
import home from '../lib/pages/Home';
import protected_page from '../lib/pages/protected_page';
import respond from '../lib/Respond';
import news from '../lib/News';
import user from '../lib/User'
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
    this.server.delete('/user', user);
    this.server.get('/protected', isLoggedIn, protected_page)
    this.server.get('/auth/google',
      passport.authenticate('google', { scope: ['email', 'profile'] })
    )
    this.server.get('/google/callback',
      passport.authenticate('google', {
        successRedirect: '/protected',
        failureRedirect: '/auth/failure',
      })
    )
    this.server.get('/auth/failure', (req:any, res:any) => {
      res.send('something went wrong..');
    })
  }
}
