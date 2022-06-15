const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const path = require("path");

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

// parse cookies

// routing setup

// error handling

app.listen(process.env.PORT, () => {
  console.log(`app listening to port ${process.env.PORT}`);
});
