//  multer middleware for avatar upload and save it to the database as a string (not a file) (avatar: String) in the People schema. This will be used in the People controller. The multer middleware will be used in the People controller.
//

const uploader = require("../../utilities/singleUploader");

function avatarUpload(req, res, next) {
  const upload = uploader(
    // avatars is the subfolder name in the uploads folder
    "avatars",
    // file types that are allowed to be uploaded
    ["image/png", "image/jpeg", "image/jpg"],
    // max file size in bytes 1mb
    100000,
    // error message for the file type
    "only .jpg, .jpeg or .png format is allowed"
  );

  // call the middleware function to catch the error before file upload and avoid to send the error to the default error handler
  upload.any()(req, res, (err) => {
    if (err) {
      res.status(500).json({
        errors: {
          avatar: {
            msg: err.message,
          },
        },
      });
    } else {
      // if there is no error, then the file is uploaded and the next middleware will be called which will be the validation middleware
      next();
    }
  });
}

module.exports = avatarUpload;
