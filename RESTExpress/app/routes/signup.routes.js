// module.exports = app => {
//     const Login = require("../controllers/login.controller.js");

//     var router = require("express").Router();

    
//     app.use('/api/newUser', router);
// };
const router = require('express').Router();

const Login = require("../controllers/login.controller.js");


router.post("/newUser", Login.newUser);


module.exports = router;