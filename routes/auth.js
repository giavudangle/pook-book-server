import { Router } from "express";
const router = Router();
//import { user_register, user_login, user_resetpw, user_receivepw, user_edit, user_photoUpload } from "../controllers/user";
import verifyToken from "../middlewares/verifytoken";
import { upload } from "../middlewares/uploadProfilePicture";

import {USER_EDIT, USER_LOGIN, USER_REGISTER, USER_UPLOAD_PHOTO} from '../controllers/user'

router.post("/register", USER_REGISTER);
router.post("/login", USER_LOGIN);
router.patch("/:id", verifyToken, USER_EDIT);
// router.post("/reset_pw", user_resetpw);
// router.post("/receive_new_password/:userId/:token", user_receivepw);
router.patch(
  "/photo/:id",
  verifyToken,
  upload.single("profile"),
  USER_UPLOAD_PHOTO
);

export default router;
