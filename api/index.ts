import { ApiRoutes } from './routes/ApiRoutes';
const port = 8081;


const bodyParser = require('body-parser');
const passport = require('passport');
const express = require('express');
const session = require('express-session');
const app = express();
app.use(session({ secret: process.env.session_secret }));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json())
app.use(express.static('public'));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
require("./auth")

var apiRoutes = new ApiRoutes(app);
apiRoutes.listen();

app.listen(port, function () {
  console.log('%s listening on port %d', app.name, port);
});
