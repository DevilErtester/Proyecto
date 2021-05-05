const db = require("../models");
const files = db.files;
const Op = db.Sequelize.Op;
const jwt = require('jsonwebtoken');
const fs = require('fs')



exports.uploadFile = async (req, res, next) => {
    const user = jwt.decode(req.cookies.jwt)
    try {
        if (!req.files) {
            res.send({
                status: false,
                message: 'No file uploaded'
            });
        } else {
            //Use the name of the input field to retrieve the uploaded file
            const fileUploaded = req.files.file;

            //Use the mv() method to place the file in upload directory (i.e. "uploads")
            const dirUpload ='uploads/' + user.username + '/' + fileUploaded.name;
            await fileUploaded.mv(dirUpload);

            //send response
            res.send({
                status: true,
                message: 'File is uploaded',
                data: {
                    name: fileUploaded.name,
                    mimetype: fileUploaded.mimetype,
                    size: fileUploaded.size
                }
            });
            //create a file JSON to assign each file uploaded to the user uploading them inside the DB
            const file = ({
                name: fileUploaded.name,
                OwnerId: user.username,
                size: fileUploaded.size,
                type: fileUploaded.mimetype
            })
            //upload the file name,and user who has uploaded it to the DB
            files.create(file);
        }
    } catch (err) {
        res.status(500).send(err);
    }
}
exports.getAllFiles = async (req,res,next) => {
    const user = jwt.decode(req.cookies.jwt).username
    const allFiles = await files.findAll({
        where: {
            OwnerId:{
                [Op.like]:user
            }
        }
    })
    res.send(allFiles);
}
exports.deleteFilebyName = async (req,res,next) =>{
    const user = jwt.decode(req.cookies.jwt).username
    console.log(req.params)
    if (!req.params.filename) {
        console.log("No file received");
        message = "Error! in file delete.";
        return res.status(500).json('error in delete');
      } else {
        console.log('file received');
        try {
            fs.unlinkSync('uploads/'+user+'/'+req.params.filename);
            console.log('successfully deleted /tmp/hello');
            files.destroy({
                where: {
                    name:req.params.filename,
                    OwnerId:user
                }
            })
            next();
            return res.status(200).send('Successfully! file has been Deleted');
          } catch (err) {
            // handle the error
            return res.status(400).send(err);
          }
        
      }
}