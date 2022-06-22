// external imports
const express = require("express");

// internal imports
const {
  getUsers,
  addUser,
  removeUser,
} = require("../controler/usersController");
const decorateHtmlResponse = require("../middlewares/common/decorateHTMLresponse");
const avatarUpload = require("../middlewares/users/avatarUpload");
const {
  addUserValidators,
  addUserValidationHandler,
} = require("../middlewares/users/userValidators");

const { checkLogin } = require("../middlewares/common/checkLogin");

const router = express.Router();

// Users page
router.get("/", decorateHtmlResponse("Users"), checkLogin, getUsers);

// add user form
router.post(
  "/",
  checkLogin, // check if user is logged in so that user can add user
  avatarUpload,
  addUserValidators,
  addUserValidationHandler,
  addUser
);

// remove user
router.delete("/:id", removeUser);

module.exports = router;
