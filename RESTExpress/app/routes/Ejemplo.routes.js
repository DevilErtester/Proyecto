
const router = require('express').Router();
const ejemplo = require("../controllers/ejemplo.controller.js");
const Login = require("../controllers/login.controller.js");

const authenticateRequest = (req, res, next) => {
    console.info('Authenticating request...');

    req.authorized = true;


    return next();

}


router.use('*', Login.verifyLogin);
router.post("/ejemplo", ejemplo.ChangeMsg);

module.exports = router;
