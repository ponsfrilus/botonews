import { ApiRoutes } from "./routes/ApiRoutes";
const port = 8081;

var restify = require("restify");
var server = restify.createServer();

var apiRoutes = new ApiRoutes(server);
apiRoutes.listen();

var test: BotonewsItem = {
  name: "test",
  title: "test",
  image_url: new URL("https://www.google.com"),
};

server.listen(port, function () {
  console.log("%s listening at %s", server.name, server.url);
});
