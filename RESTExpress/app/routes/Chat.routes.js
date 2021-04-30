
const router = require('express').Router();
const chat = require("../controllers/chat.controller.js");

router.post("/chat", chat.getThisUser);

module.exports = router;
