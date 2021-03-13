import multer, { diskStorage } from "multer";

const storage = diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/api/static/images/userPictures");
  },
  filename: function (req, file, cb) {
    cb(null, req.params.id + ".jpg");
  },
});
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png"
  ) {
    cb(null, true);
  } else {
    cb(new Error("Image uploaded is not of type jpg/jpeg  or png"), false);
  }
};
const upload = multer({ storage, fileFilter });

export default upload;
