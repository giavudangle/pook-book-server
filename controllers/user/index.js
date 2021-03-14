import User from '../../models/User';

import { SERVER_RESPONSE_CONSTANTS, CLIENT_RESPONSE_CONSTANTS, DATABASE_RESPONSE_CONSTANTS, AUTHENTICATION_RESPONSE_CONSTANTS } from '../../constants'

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


const UserLogin = async (req,res) => {
  const {error} = loginValidation(req.body);
  const email = req.body.email.toLowerCase();
  const { password } = req.body;
  const pushTokens = req.body.pushTokens;

  if (error) {
    return res.status(SERVER_RESPONSE_CONSTANTS.SERVER_ERROR_CODE).send(error.details[0].message);
  }

  

  /**
   * Role Activation
   * 1. Admin
   * 2. Client
   */

  // Admin Login
  if (
    email === process.env.DEFAULT_ADMINNAME &&
    password === process.env.DEFAULT_PASSWORD
  ) {
    jwt.sign(
      {name:'admin'},
      process.env.SECRET_TOKEN,
      {expiresIn:'3600s'},
      (err,token) => {
        if(err){
          return res.status(SERVER_RESPONSE_CONSTANTS.SERVER_ERROR_CODE)
            .send({
              status:SERVER_RESPONSE_CONSTANTS.SERVER_ERROR_STATUS,
              message:SERVER_RESPONSE_CONSTANTS.SERVER_ERROR_CONTENT
            })
        }
        res.header('auth-token',token).send({
          name:'admin',
          token:token,
          loginAt: Date.now(),
          expireTime:Date.now() + 60 * 60 * 1000, // 5m
        })
      }
    )
  } 
  // By the way -> client login
  else {
    const user = await User.findOne({email});
    if(!user) {
      return res.status(AUTHENTICATION_RESPONSE_CONSTANTS.AUTHENTICATION_FAILED_CODE)
        .send({
          status:CLIENT_RESPONSE_CONSTANTS.CLIENT_ERROR_STATUS,
          message: AUTHENTICATION_RESPONSE_CONSTANTS.NO_USER_WITH_EMAIL
        })
    }
    const passwordMatching = await bcrypt.compare(password,user.password);
    if(!passwordMatching){
      return res.status(AUTHENTICATION_RESPONSE_CONSTANTS.AUTHENTICATION_FAILED_CODE)
        .send({
          status:CLIENT_RESPONSE_CONSTANTS.CLIENT_ERROR_STATUS,
          message: AUTHENTICATION_RESPONSE_CONSTANTS.PASSWORD_NOT_MATCHING
        })
    }

    let checkingPushToken;
    // Loop in array tokens of user and check isContain
    if(pushTokens.length > 0) {
      const checker = user.pushTokens.some((tokenIterator) => {
        return tokenIterator === pushTokens[0];
      })
      checkingPushToken = checker;
    }
    if(checkingPushToken!== undefined || checkingPushToken!==null) {
      user.pushTokens.push(pushTokens[0]);
      await user.save();
    }

    // If user doesnt have token => we try to create it for their
    try {
      jwt.sign(
        {userId:user._id},
        process.env.SECRET_TOKEN,
        {expiresIn:'3600s'},
        (err,token) => {
          if(err){
            return res.status(SERVER_RESPONSE_CONSTANTS.SERVER_ERROR_CODE).send(err)
          }
          return res.status(SERVER_RESPONSE_CONSTANTS.SERVER_SUCCESS_CODE).send({
            userid: user._id,
            name: user.name,
            password:password,
            email: user.email,
            phone: user.phone,
            address: user.address,
            profilePicture: user.profilePicture,
            token: token,
            loginAt: Date.now(),
            expireTime: Date.now() + 60 * 60 * 1000,
          })
        }
      )
    } catch (e) {
      res.status(SERVER_RESPONSE_CONSTANTS.SERVER_ERROR_CODE)
      .send(e)
    }
  }
}




export {
  UserRegister as USER_REGISTER,
  UserLogin as USER_LOGIN
}