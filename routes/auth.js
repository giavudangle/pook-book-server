import { Router } from "express";
const router = Router();
//import { user_register, user_login, user_resetpw, user_receivepw, user_edit, user_photoUpload } from "../controllers/user";
import verifyToken from "../middlewares/verifytoken";
import { single } from "../middlewares/uploadProfilePicture";

import {USER_LOGIN, USER_REGISTER} from '../controllers/user'

router.post("/register", USER_REGISTER);
router.post("/login", USER_LOGIN);
// router.patch("/:id", verifyToken, user_edit);
// router.post("/reset_pw", user_resetpw);
// router.post("/receive_new_password/:userId/:token", user_receivepw);
// router.patch(
//   "/photo/:id",
//   verifyToken,
//   single("profilePic"),
//   user_photoUpload
// );

export default router;
