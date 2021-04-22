module.exports = app => {
    const Login = require("../controllers/login.controller.js");

    var router = require("express").Router();

    router.post("/", Login.login);

    router.post("/verifyLogin", Login.verifyLogin);

    app.use('/api/login', router);
};