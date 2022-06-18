// extarnal imports
const createError = require("http-errors");

// common function for single file upload that can be used in the middleware or the controller.

function uploader(
  subfolder_path,
  allowed_file_types,
  max_file_siza,
  error_msg
) {
  // make multer upload object

  // File upload folder path
  const UPLOADS_FOLDER = `${__dirname}/../public/uploads/${subfolder_path}`;

  // storage definition for multer
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, UPLOADS_FOLDER);
    },
    filename: function (req, file, cb) {
      const fileExt = path.extname(file.originalname);
      const fileName =
        path.basename(
          file.originalname
            .replace(fileExt, "")
            .tolowercase()
            .split(" ")
            .join("-")
        ) +
        "-" +
        Date.now();

      cb(null, fileName + fileExt);
    },
  });

  // prepare the final multer upload object
  const upload = multer({
    storage: storage,
    limits: {
      fileSize: max_file_siza,
    },
    fileFilter: (req, file, cb) => {
      if (allowed_file_types.includes(file.mimetype)) {
        cb(null, true);
      } else {
        cb(createError(error_msg));
      }
    },
  });

  return upload;
}

module.exports = uploader;
