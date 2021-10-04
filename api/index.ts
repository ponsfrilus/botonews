import { ApiRoutes } from "./routes/ApiRoutes";
const port = 8081;

var restify = require("restify");
var server = restify.createServer();
server.use(restify.plugins.queryParser());

var apiRoutes = new ApiRoutes(server);
apiRoutes.listen();

server.listen(port, function () {
  console.log("%s listening at %s", server.name, server.url);
});
