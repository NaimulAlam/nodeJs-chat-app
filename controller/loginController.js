// extarnal imports
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const createError = require("http-errors");

// internal imports
const User = require("../models/People");

// get login page
function getLogin(req, res, next) {
  res.render("index");
}

// login function
async function login(req, res, next) {
  try {
    // find a user with the eamil/username/mobile number provided
    const user = await User.findOne({
      $or: [{ email: req.body.username }, { mobile: req.body.username }],
    });
    if (user && user._id) {
      // check given password matched with the hashed password in the database
      const isValidPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (isValidPassword) {
        // prepare the user object to genarate token and share public info only not the private info
        const userObj = {
          username: user.name,
          email: user.email,
          mobile: user.mobile,
          role: "user",
        };
        // generate token
        const token = jwt.sign(userObj, process.env.JWT_SECRET, {
          expiresIn: process.env.JWT_EXPIRY,
        });

        // set cookie with res.cookie()
        res.cookie(process.env.COOKIE_NAME, token, {
          maxAge: process.env.JWT_EXPIRY,
          // httpOnly helps to prevent javascript from accessing the cookie through the browser console or by using the F12 developer tools. This is a security feature to prevent XSS attacks. It is also a good practice to set this to true. It is also a good idea to set the secure option to true. This will help to prevent the cookie from being sent over HTTP when the user is using a non-HTTPS connection.
          httpOnly: true,
          // signed encription is used to prevent tampering with the cookie.
          signed: true,
        });

        // set logged in user to local identifier
        res.locals.loggedInUser = userObj;

        res.render("inbox");
      } else {
        throw createError(
          "Login failed. Please try again. Check your credentials."
        );
      }
    } else {
      throw createError("Login failed. Please try again.");
    }
  } catch (err) {
    res.render("index", {
      data: {
        username: req.body.username,
      },
      errors: {
        common: {
          msg: err.message,
        },
      },
    });
  }
}

// do logout by clearing cookies
function logout(req, res) {
  res.clearCookie(process.env.COOKIE_NAME);
  res.send("logged out");
}

module.exports = {
  getLogin,
  login,
  logout,
};
