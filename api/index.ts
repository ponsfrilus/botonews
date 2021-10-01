import { Next, RequestHandler, RequestHandlerType } from "restify";

var restify = require("restify");

function respond(req: any, res: any, next: any) {
  res.send("hello " + req.params.name);
  next();
}

var server = restify.createServer();
server.get("/hello/:name", respond);
server.head("/hello/:name", respond);

server.listen(8081, function () {
  console.log("%s listening at %s", server.name, server.url);
});
