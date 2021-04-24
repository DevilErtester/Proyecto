const router = require("express").Router();

const filesUp = require("../controllers/fileUpload.controller.js");
const Login = require("../controllers/login.controller.js");

router.use('*', Login.verifyLogin);
router.post('/uploadFile', Login.getUser, filesUp.uploadAvatar);


module.exports = router;