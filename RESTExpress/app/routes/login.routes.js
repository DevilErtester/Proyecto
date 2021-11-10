
const router = require("express").Router();

const Login = require("../controllers/login.controller.js");


router.post("/login", Login.login);
// router.post("/verifyLogin", Login.verifyLogin);

module.exports = router;