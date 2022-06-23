// external imports
const express = require("express");

// internal imports
const { getLogin, login, logout } = require("../controller/loginController");
const decorateHtmlResponse = require("../middlewares/common/decorateHtmlResponse");
const {
  loginValidators,
  loginValidationHandler,
} = require("../middlewares/login/loginValidators");
const { redirectLoggedIn } = require("../middlewares/common/checkLogin");

const { redirectLoggedIn } = require("../middlewares/common/checkLogin");

const router = express.Router();

// set page title
const page_title = "Login";

// login page
// decorateHtmlResponse is used to decorate the response with the html file.
router.get("/", decorateHtmlResponse(page_title), redirectLoggedIn, getLogin);

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
