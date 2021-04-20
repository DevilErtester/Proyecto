const db = require("../models");
const Tutorial = db.tutorials;
const Op = db.Sequelize.Op;

const jwt = require('jsonwebtoken');

function generateAccessToken(username) {
    return jwt.sign({ username }, process.env.TOKEN_SECRET, {

        expiresIn: '24h'

    });
}

exports.login = (req, res) => {
    if (req.body.user === "user" && req.body.pass === "pass") {
        const token = generateAccessToken(req.body.user);
        res.json(token);
    }
};
