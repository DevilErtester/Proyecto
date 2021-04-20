module.exports = app => {
    const ejemplo = require("../controllers/ejemplo.controller.js");

    var router = require("express").Router();

    router.post("/", ejemplo.ChangeMsg);


    app.use('/api/ejemplo', router);
};