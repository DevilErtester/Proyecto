
const router = require('express').Router();
const ejemplo = require("../controllers/ejemplo.controller.js");
const Login = require("../controllers/login.controller.js");



router.post("/ejemplo", ejemplo.ChangeMsg);

module.exports = router;
