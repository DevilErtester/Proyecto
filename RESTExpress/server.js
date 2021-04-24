const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const fileUpload = require('express-fileupload');
const dotenv = require('dotenv');
const morgan = require('morgan');
const _ = require('lodash');

// get config vars
dotenv.config();

// access config var
console.log(process.env.TOKEN_SECRET);


const app = express();

const db = require("./app/models");
db.sequelize.sync();

var corsOptions = {
  origin: "http://localhost:8081",
  credentials: true
};

// enable files upload
app.use(fileUpload({
  createParentPath: true
}));


//enable cookie parser for main process
app.use(cookieParser());
//enable cors for main process
app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
//Node.js middleware for logging HTTP requests.
app.use(morgan('dev'));
// API
// Primer endpoint: /login

const loginRouter = require("./app/routes/login.routes.js");
const ejemploRouter = require("./app/routes/Ejemplo.routes.js");
const filesRouter = require("./app/routes/fileUpload.routes.js");

const checklogin = require("./app/controllers/login.controller.js").verifyLogin;


app.use('/api', loginRouter);
app.use('*', checklogin);
app.use('/api', ejemploRouter);
app.use('/api', filesRouter);


require("./app/routes/tutorial.routes.js")(app);

// // require("./app/routes/login.routes.js")(app);
// require("./app/routes/signup.routes.js")(app);


// set port, listen for requests

const PORT = process.env.PORT;

app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(err.status || 500).send(err.message || 'Something broke!')
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});