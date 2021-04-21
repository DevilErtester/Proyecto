module.exports = app => {
    const Login = require("../controllers/login.controller.js");

    var router = require("express").Router();

    router.post("/", Login.newUser);

    app.use('/api/newUser', router);
};