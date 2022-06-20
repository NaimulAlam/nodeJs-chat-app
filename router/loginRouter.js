// external imports
const express = require("express");

// internal imports
const { getLogin, login, logout } = require("../controler/loginController");
const decorateHtmlResponse = require("../middlewares/common/decorateHTMLresponse");
const {
  loginValidators,
  loginValidationHandler,
} = require("../middlewares/login/loginValidators");

const router = express.Router();

// set page title
const page_title = "Login";

// login page
// decorateHtmlResponse is used to decorate the response with the html file.
router.get("/", decorateHtmlResponse(page_title), getLogin);

// process login request
router.post(
  "/",
  decorateHtmlResponse(page_title),
  loginValidators,
  loginValidationHandler,
  login
);

// logout request
router.delete("/", logout);

module.exports = router;
