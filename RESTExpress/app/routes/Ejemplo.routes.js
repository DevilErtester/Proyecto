
const router = require('express').Router();
const ejemplo = require("../controllers/ejemplo.controller.js");


const authenticateRequest = (req, res, next) => {
    console.info('Authenticating request...');

    req.authorized = true;

    const err = new Error('Test');
    err.status = 417;
    throw err;


    return next();

}


router.use('*', authenticateRequest);
router.post("/ejemplo", ejemplo.ChangeMsg);

module.exports = router;
