// external imports
const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const path = require("path");

// internal imports
const loginRouter = require("./router/loginRouter");
const {
  notFoundHandler,
  errorHandler,
} = require("./middlewares/common/errorHandler");

const app = express();
dotenv.config();

// database connection
mongoose
  .connect(process.env.MONGO_DB_CONNECTION, {
    useNewUrlParser: true,
    useUniFiedTopology: true,
  })
  .then(() => console.log("Database connected successfully"))
  .catch((err) => console.log(err));

// request parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// set the view engine to ejs
app.set("view engine", "ejs");

// set the public folder to serve static content
app.use(express.static(path.join(__dirname, "public")));

// routing setup
app.use("/", loginRouter);
app.use("/users", usersRouter);
app.use("/inbox", inboxRouter);

// 404 Not Found error handler
app.use(notFoundHandler);

// default /common error handler
app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(`app listening to port http://localhost:${process.env.PORT}`);
});
