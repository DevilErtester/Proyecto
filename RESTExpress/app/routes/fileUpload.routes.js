const router = require("express").Router();
const multer  = require('multer')
const upload = multer({ dest: '../../uploads' })
const filesUp = require("../controllers/fileUpload.controller.js");

router.post('/uploadFile',upload.single("uploadFile"), filesUp.uploadFile);
router.get('/getAllFiles', filesUp.getAllFiles);
router.get('/downloadFile/:filename', filesUp.downloadFile)
router.delete('/deleteFilebyName/:filename', filesUp.deleteFilebyName);

module.exports = router;