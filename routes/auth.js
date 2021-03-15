import { Router } from "express";
const router = Router();
import verifyToken from "../middlewares/verifytoken";
import { upload } from "../middlewares/uploadProfilePicture";

import {USER_EDIT, USER_LOGIN, USER_RECEIVE_NEW_PASSWORD, USER_REGISTER, USER_RESET_PASSWORD, USER_UPLOAD_PHOTO} from '../controllers/user'

router.post("/register", USER_REGISTER);
router.post("/login", USER_LOGIN);
router.patch("/:id", verifyToken, USER_EDIT);
router.post("/reset_password", USER_RESET_PASSWORD);
router.post("/receive_new_password/:userId/:token", USER_RECEIVE_NEW_PASSWORD);
router.patch(
  "/photo/:id",
  verifyToken,
  upload.single("profile"),
  USER_UPLOAD_PHOTO
);

export default router;
