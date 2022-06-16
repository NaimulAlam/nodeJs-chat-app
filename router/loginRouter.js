// external imports
const express = require("express");

// internal imports
const { getLogin } = require("../controler/loginController");
const decorateHtmlResponse = require("../middlewares/common/decorateHTMLresponse");

const router = express.Router();

// login page
router.get("/", decorateHtmlResponse("Login"), getLogin);

module.exports = router;
