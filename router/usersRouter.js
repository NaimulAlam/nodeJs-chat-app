// external imports
const express = require("express");

// internal imports
const { getUsers, addUser } = require("../controler/usersController");
const decorateHtmlResponse = require("../middlewares/common/decorateHTMLresponse");
const avatarUpload = require("../middlewares/users/avatarUpload");
const {
  addUserValidators,
  addUserValidationHandler,
} = require("../middlewares/users/userValidators");

const router = express.Router();

// Users page
router.get("/", decorateHtmlResponse("Users"), getUsers);

// add user form
router.post(
  "/",
  avatarUpload,
  addUserValidators,
  addUserValidationHandler,
  addUser
);

module.exports = router;
