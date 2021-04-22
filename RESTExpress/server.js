const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");




const dotenv = require('dotenv');

// get config vars
dotenv.config();

// access config var
process.env.TOKEN_SECRET;


const app = express();

const db = require("./app/models");
db.sequelize.sync();

var corsOptions = {
  origin: "http://localhost:8081",
  credentials: true
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// API
// Primer endpoint: /login

const loginRouter = require("./app/routes/login.routes.js");
const ejemploRouter = require("./app/routes/Ejemplo.routes.js");

app.use('/api', loginRouter);
app.use('/api', ejemploRouter);


// require("./app/routes/tutorial.routes.js")(app);

// // require("./app/routes/login.routes.js")(app);
// require("./app/routes/signup.routes.js")(app);


// set port, listen for requests

const PORT = process.env.PORT || 8080;

app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status( err.status || 500).send(err.message || 'Something broke!')
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

