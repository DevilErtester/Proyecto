const jwt = require('jsonwebtoken');

exports.getThisUser = (req, res) => {
    const user = jwt.decode(req.cookies.jwt)
    return res.send(user.username)
}