// extarnal imports
const bcrypt = require("bcrypt");

// get users page
function getUsers(req, res, next) {
  res.render("users");
}

// add user
async function addUser(req, res, next) {
  let newUser;
  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  if (req.file && req.file.length > 0) {
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
    res.status(2000).json({
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

module.exports = {
  getUsers,
  addUser,
};
