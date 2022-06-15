const createError = require("http-errors");

//  404 Not Found error handler
function notFoundHandler(req, res, next) {
  next(createError(404, "Your requested content was not found"));
}

// default error handler
function errorHandler(err, req, res, next) {
  res.locals.error =
    process.env.NODE_ENV === "development" ? err : { message: err.message };

  res.status(err.status || 500);

  if (res.locals.html) {
    //html response
    res.render("error", {
      title: "Error page",
    });
  } else {
    //json response
    res.json(res.locals.error);
  }

  // Examples of error handaling with ejs =>
  // res.locals.title = "Error page";
  // res.render("error");

  // either folow upper or use the below code
  // res.render(
  // "error",{
  //   title: "Error page",
  // });
}

module.exports = {
  notFoundHandler,
  errorHandler,
};
