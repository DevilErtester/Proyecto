// main express block init
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const fileUpload = require('express-fileupload');
const dotenv = require('dotenv');
const morgan = require('morgan');
const _ = require('lodash');
const app = express();





// get config vars
dotenv.config();

// access config var
console.log(process.env.TOKEN_SECRET);




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
const signupRouter = require("./app/routes/signup.routes.js");
const tutoRouter = require("./app/routes/tutorial.routes.js");
const chatRouter = require("./app/routes/Chat.routes.js");

const checkLogin = require("./app/controllers/login.controller.js").verifyLogin;


app.use('/api', loginRouter);
app.use('/api', signupRouter);
app.use('/api', ejemploRouter);
app.use('/api', tutoRouter);
app.use('/api', filesRouter);
app.use('/api', chatRouter);

// set port, listen for requests

const PORT = process.env.PORT;

app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(err.status || 500).send(err.message || 'Something broke!')
})

const server = app.listen(PORT | 8080, () => {
  console.log(`Server is running on port ${PORT}.`);
});


const io = require('socket.io')(server, {
  cors: {
    origin: "http://localhost:8081",
    methods: ["GET", "POST"]
  }
});

io.on('connection', function (socket) {

  socket.on('SEND_MESSAGE', function (data) {
    io.emit('MESSAGE', data)
  });
  socket.onAny((event, ...args) => {
    console.log(event, args);
  });
});