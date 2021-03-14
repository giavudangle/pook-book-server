import User from '../../models/User';

import { SERVER_RESPONSE_CONSTANTS, CLIENT_RESPONSE_CONSTANTS } from '../../constants'

import { registerValidation, loginValidation } from '../../middlewares/validation'

import bcrypt from 'bcryptjs'

import jwt from 'jsonwebtoken'

import { transporter, getPasswordResetURL, resetPasswordTemplate, registerUserTemplate }
  from '../../middlewares/email'

import usePasswordHashToMakeToken from '../../middlewares/createUserToken'

import pushNotification from '../../middlewares/pushNotification';

const UserRegister = async (req, res) => {
  /**
   * Note : In postman we need to put all request data of client
   * => Form-urlencoded (beacause we just have only raw data (not BLOG))
   */

  // Validation req.body send from user
  const {error} = registerValidation(req.body);
  if(error) {
    return res.status(SERVER_RESPONSE_CONSTANTS.SERVER_SUCCESS_CODE)
      .send({
        error: CLIENT_RESPONSE_CONSTANTS.CLIENT_ERROR_CONTENT,
        message: error.details[0].message,
      })
  }


  // check email if it exist
  const emailHasExist = await User.findOne({ email: req.body.email });
  if (emailHasExist) {
    return res.status(SERVER_RESPONSE_CONSTANTS.SERVER_ERROR_CODE)
      .send({
        error: SERVER_RESPONSE_CONSTANTS.SERVER_ERROR_CONTENT,
        message: 'Your email are already exists'
      })
  }

  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(req.body.password, salt);
  const user = new User({
    name: req.body.name,
    email: req.body.email.toLowerCase(),
    password: hashedPassword,
    pushTokens: req.body.pushTokens,
    phone: '',
    address: '',
    profilePicture: '',
  });

  const sendEmail = (u) => {
    const {from,to,subject,html} = registerUserTemplate(u)
    transporter
      .sendMail({from,to,subject,html})
      .then((info) => console.log(`**Email sent**`, info))
      .catch((e) => res.status(SERVER_RESPONSE_CONSTANTS.SERVER_ERROR_CODE))
  };
  

  const userSaved = await user.save();
  sendEmail(userSaved)
  return res.status(SERVER_RESPONSE_CONSTANTS.SERVER_SUCCESS_CODE).send({
    status:"Success",
    message:"Register account successfully",
    data:userSaved
  })

}

export {
  UserRegister as USER_REGISTER
}