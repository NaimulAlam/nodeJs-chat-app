// extarnal imports
const { check, validationResult } = require("express-validator");

const loginValidators = [
  check("username")
    .isLength({ min: 1 })
    .withMessage("Email or Mobile No. is required"),
  check("password").isLength({ min: 1 }).withMessage("Password is required"),
];

// validation handeler for login will help to validate the request body and return error if any error found.
const loginValidationHandler = (req, res, next) => {
  const errors = validationResult(req);
  // mappedErrors is an array of objects with the following properties: param, msg, value. param is the name of the parameter that failed validation, msg is the error message, and value is the value of the parameter that failed validation.
  const mappedErrors = errors.mapped();

  if (Object.keys(mappedErrors).length === 0) {
    next();
  } else {
    res.render("index", {
      data: {
        username: req.body.username,
      },
      errors: mappedErrors,
    });
  }
};

module.exports = {
  loginValidators,
  loginValidationHandler,
};
