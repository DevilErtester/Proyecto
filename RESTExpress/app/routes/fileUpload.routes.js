const router = require("express").Router();

const filesUp = require("../controllers/fileUpload.controller.js");
router.post('/uploadFile', filesUp.uploadAvatar);


module.exports = router;