import home from '../lib/pages/Home';
import respond from '../lib/Respond';
import news from '../lib/News';
import user from '../lib/user'
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
    this.server.delete('/user', user)
  }
}
