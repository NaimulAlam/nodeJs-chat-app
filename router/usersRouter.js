// external imports
const express = require("express");

// internal imports
const { getUsers } = require("../controler/usersController");
const decorateHtmlResponse = require("../middlewares/common/decorateHTMLresponse");

const router = express.Router();

// Users page
router.get("/", decorateHtmlResponse("Users"), getUsers);

module.exports = router;
