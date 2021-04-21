const db = require("../models");
const Login = db.users;
const Op = db.Sequelize.Op;

const jwt = require('jsonwebtoken');

function generateAccessToken(username) {
    return jwt.sign({ username }, process.env.TOKEN_SECRET, {

        expiresIn: '24h'

    });
}
function verifyToken(token)
{
  return jwt.verify(token, SECRET_KEY)
}

exports.login = (req, res, next) => {
    Login.findOne({
        where: {username: req.body.user,
                password: req.body.pass 
            }
      }).then(users =>{
        if (users) {
            const token = generateAccessToken(req.body.user);
            res.cookie('sessionCookie', token, {httpOnly: true})
            res.status(200).json({ success: true })
        }else{
            res.status(200).json({success:false})
        }
      })
};
exports.newUser = (req, res, next) => {
    Login.create({
        username: req.body.user,
        password: req.body.pass     
      })
    .then(data => {
        res.status(200).json({ success: true })
        res.send(data);
    })
    .catch(err => {
        res.status(200).json({ success: false,
            message:
            err.message || "Some error occurred while creating the User." })
    });
};

exports.verifyLogin = (req, res, next) =>
{
  var cookie = req.cookies.sessionCookie;
  try
  {
    verifyToken(cookie)
    next()
  }
  catch (err)
  {
    const status = 401
    const message = 'Unauthorized'
    res.status(status).json({ status, message })
  } 
};