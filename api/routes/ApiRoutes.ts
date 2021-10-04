import respond from "../lib/Respond";
import news from "../lib/News"
export class ApiRoutes {
  server: any;
  constructor(server: any) {
    this.server = server;
  }

  listen() {
    this.server.get("/hello/:name", respond);
    this.server.head("/hello/:name", respond);
    this.server.get("/news", news)
  }
}
