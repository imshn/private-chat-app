const router = require("express").Router();
const { getMessages } = require("../controllers/chatController");

router.get("/messages/:from/:to", getMessages);

module.exports = router;
