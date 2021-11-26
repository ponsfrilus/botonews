import { ApiRoutes } from './routes/ApiRoutes';
const port = 8081;

const bodyParser = require("body-parser");
const express = require('express');
const app = express();
app.use(bodyParser.json())

var apiRoutes = new ApiRoutes(app);
apiRoutes.listen();

app.listen(port, function () {
  console.log('%s listening on port %d', app.name, port);
});
