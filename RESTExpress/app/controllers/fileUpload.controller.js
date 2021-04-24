const db = require("../models");
const files = db.files;
const Op = db.Sequelize.Op;
const jwt = require('jsonwebtoken');
const fs = require('fs')



exports.uploadAvatar = (req, res, next) => {
    const user = jwt.decode(req.cookies.jwt)
    try {
        if (!req.files) {
            res.send({
                status: false,
                message: 'No file uploaded'
            });
        } else {
            //Use the name of the input field (i.e. "avatar") to retrieve the uploaded file
            let avatar = req.files.avatar;

            //Use the mv() method to place the file in upload directory (i.e. "uploads")
            avatar.mv('./uploads/' + avatar.name);

            //send response
            res.send({
                status: true,
                message: 'File is uploaded',
                data: {
                    name: avatar.name,
                    mimetype: avatar.mimetype,
                    size: avatar.size
                }
            });
            //create a file JSON to assign each file uploaded to the user uploading them inside the DB
            const file = ({
                fileName: avatar.name,
                OwnerId: user.username
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
    console.log(allFiles)
    res.send(allFiles);
}
exports.deleteFilebyName = async (req,res) =>{
    if (!req.params.filename) {
        console.log("No file received");
        message = "Error! in file delete.";
        return res.status(500).json('error in delete');
    
      } else {
        console.log('file received');
        console.log(req.params.filename);
        try {
            fs.unlinkSync('uploads/'+req.params.filename);
            console.log('successfully deleted /tmp/hello');
            return res.status(200).send('Successfully! file has been Deleted');
          } catch (err) {
            // handle the error
            return res.status(400).send(err);
          }
        
      }
}