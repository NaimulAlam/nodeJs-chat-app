// extarnal imports
const bcrypt = require("bcrypt");
const { unlink } = require("fs");
const path = require("path");

// internal imports
const User = require("../models/People");

// get users page
async function getUsers(req, res, next) {
  try {
    const users = await User.find();
    res.render("users", {
      users: users,
    });
  } catch (err) {
    {
      next(err);
    }
  }
}

// add user
async function addUser(req, res, next) {
  let newUser;
  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  if (req.files && req.files.length > 0) {
    newUser = new User({
      ...req.body,
      avatar: req.files[0].filename,
      password: hashedPassword,
    });
  } else {
    newUser = new User({
      ...req.body,
      password: hashedPassword,
    });
  }

  // save the new user to the database or throw an error if there is a problem
  try {
    const result = await newUser.save();
    res.status(200).json({
      message: "User added successfully",
    });
  } catch (err) {
    res.status(500).json({
      errors: {
        common: {
          msg: "Unknow error occured",
        },
      },
    });
  }
}

// remove user
async function removeUser(req, res, next) {
  try {
    // findByIdAndDelete is a method that deletes a document from the database and returns the document that was deleted.
    // So we will  get the user so we also can remove his avatar from the file system.
    const user = await User.findByIdAndDelete({
      _id: req.params.id,
    });

    // remove the avatar if it exists
    if (user.avatar) {
      // unlink is a method that deletes a file from the file system. It takes the path of the file as an argument. So we need to get the path of the avatar. We can do this by using the path.join method.
      // to use unlink import it from fs and path import it from path.
      unlink(
        path.join(__dirname, `../public/uploads/avatars/${user.avatar}`),
        (err) => {
          if (err) {
            console.log(err);
          }
        }
      );
    }

    res.status(200).json({
      message: "User removed successfully",
    });
  } catch (err) {
    res.status(500).json({
      errors: {
        common: {
          msg: "Could not delete user",
        },
      },
    });
  }
}

module.exports = {
  getUsers,
  addUser,
  removeUser,
};
