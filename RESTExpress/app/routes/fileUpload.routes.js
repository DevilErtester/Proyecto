const router = require("express").Router();

const filesUp = require("../controllers/fileUpload.controller.js");

router.post('/uploadFile', filesUp.uploadAvatar);
router.get('/getAllFiles', filesUp.getAllFiles);
router.delete('/deleteFilebyName/:filename', filesUp.deleteFilebyName);

module.exports = router;