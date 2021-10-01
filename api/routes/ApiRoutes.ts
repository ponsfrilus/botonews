import respond from "../lib/Respond";
export class ApiRoutes {
  server: any;
  constructor(server: any) {
    this.server = server;
  }

  listen() {
    this.server.get("/hello/:name", respond);
    this.server.head("/hello/:name", respond);
  }
}
