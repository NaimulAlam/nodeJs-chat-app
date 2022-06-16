// external imports
const express = require("express");

// internal imports
const { getInbox } = require("../controler/inboxController");
const decorateHtmlResponse = require("../middlewares/common/decorateHTMLresponse");

const router = express.Router();

// inbox page
router.get("/", decorateHtmlResponse("Inbox"), getInbox);

module.exports = router;
