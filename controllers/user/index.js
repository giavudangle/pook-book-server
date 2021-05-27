import User from '../../models/User';
import fs from 'fs'
import { SERVER_RESPONSE_CONSTANTS, CLIENT_RESPONSE_CONSTANTS, AUTHENTICATION_RESPONSE_CONSTANTS } from '../../constants'

import { registerValidation, loginValidation } from '../../middlewares/validation'

import bcrypt from 'bcryptjs'

import jwt from 'jsonwebtoken'

import { transporter, getPasswordResetURL, resetPasswordTemplate, registerUserTemplate }
  from '../../middlewares/email'

import usePasswordHashToMakeToken from '../../middlewares/createUserToken'

import pushNotification from '../../middlewares/pushNotification';


import cloudinary from '../../middlewares/cloudinary'


const UserRegister = async (req, res) => {
  /**
   * Note : In postman we need to put all request data of client
   * => Form-urlencoded (beacause we just have only raw data (not BLOG))
   */

  // Validation req.body send from user
  const { error } = registerValidation(req.body);
  if (error) {
    return res.status(SERVER_RESPONSE_CONSTANTS.SERVER_SUCCESS_CODE)
      .send({
        error: CLIENT_RESPONSE_CONSTANTS.CLIENT_ERROR_data,
        message: error.details[0].message,
      })
  }


  // check email if it exist
  const emailHasExist = await User.findOne({ email: req.body.email });
  if (emailHasExist) {
    return res.status(SERVER_RESPONSE_CONSTANTS.SERVER_ERROR_CODE)
      .send({
        error: SERVER_RESPONSE_CONSTANTS.SERVER_ERROR_data,
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
    const { from, to, subject, html } = registerUserTemplate(u)
    transporter
      .sendMail({ from, to, subject, html })
      .then((info) => console.log(`**Email sent**`, info))
      .catch((e) => res.status(SERVER_RESPONSE_CONSTANTS.SERVER_ERROR_CODE))
  };


  const userSaved = await user.save();
  sendEmail(userSaved)
  return res.status(SERVER_RESPONSE_CONSTANTS.SERVER_SUCCESS_CODE).send({
    status: "Success",
    message: "Register account successfully",
    data: userSaved
  })
}


const UserLogin = async (req, res) => {
  const { error } = loginValidation(req.body);
  const email = req.body.email.toLowerCase();
  const { password } = req.body;
  const pushTokens = req.body.pushTokens;

  const rawPassword = password;


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
      { name: 'admin' },
      process.env.SECRET_TOKEN,
      { expiresIn: '7d' },
      (err, token) => {
        if (err) {
          return res.status(SERVER_RESPONSE_CONSTANTS.SERVER_ERROR_CODE)
            .send({
              status: SERVER_RESPONSE_CONSTANTS.SERVER_ERROR_STATUS,
              message: SERVER_RESPONSE_CONSTANTS.SERVER_ERROR_data
            })
        }
        res.header('auth-token', token).send({
          name: 'admin',
          token: token,
          loginAt: Date.now(),
          expireTime: Date.now() + 86400000 * 7 // 7d
        })
      }
    )
  }
  // By the way -> client login
  else {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(AUTHENTICATION_RESPONSE_CONSTANTS.AUTHENTICATION_FAILED_CODE)
        .send({
          status: CLIENT_RESPONSE_CONSTANTS.CLIENT_ERROR_STATUS,
          message: AUTHENTICATION_RESPONSE_CONSTANTS.NO_USER_WITH_EMAIL
        })
    }
    const passwordMatching = await bcrypt.compare(password, user.password);
    if (!passwordMatching) {
      return res.status(AUTHENTICATION_RESPONSE_CONSTANTS.AUTHENTICATION_FAILED_CODE)
        .send({
          status: CLIENT_RESPONSE_CONSTANTS.CLIENT_ERROR_STATUS,
          message: AUTHENTICATION_RESPONSE_CONSTANTS.PASSWORD_NOT_MATCHING
        })
    }

    let checkingPushToken;
    // Loop in array tokens of user and check isContain
    if (pushTokens.length > 0) {
      const checker = user.pushTokens.some((tokenIterator) => {
        return tokenIterator === pushTokens[0];
      })
      checkingPushToken = checker;
    }
    if (checkingPushToken !== undefined || checkingPushToken !== null) {
      user.pushTokens.push(pushTokens[0]);
      await user.save();
    }

    // If user doesnt have token => we try to create it for their
    try {
      jwt.sign(
        { userId: user._id },
        process.env.SECRET_TOKEN,
        { expiresIn: '7d' },
        (err, token) => {
          if (err) {
            return res.status(SERVER_RESPONSE_CONSTANTS.SERVER_ERROR_CODE).send(err)
          }
          return res.status(SERVER_RESPONSE_CONSTANTS.SERVER_SUCCESS_CODE).json({
            userid: user._id,
            name: user.name,
            password: user.password,
            rawPassword : rawPassword, // :))) low security
            email: user.email,
            phone: user.phone,
            address: user.address,
            profilePicture: user.profilePicture,
            token: token,
            loginAt: Date.now(),
            expireTime: Date.now() + 60*60*24 * 7 // 7 days - 1h = 60 * 60 * 24
          })
        }
      )
    } catch (e) {
      res.status(SERVER_RESPONSE_CONSTANTS.SERVER_ERROR_CODE)
        .send(e)
    }
  }
}

// Low security
const UpdatePassword = async (req,res) => {
  const {id} = req.params;
  const {newPassword} = req.body;
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(newPassword, salt);
  User.findOneAndUpdate({_id:id},{
    password: hashedPassword,
    rawPassword: newPassword
  })
  .then((result) => {
    return res.status(SERVER_RESPONSE_CONSTANTS.SERVER_SUCCESS_CODE).send(result);
  })
  .catch((err) => {
    res.status(SERVER_RESPONSE_CONSTANTS.SERVER_ERROR_CODE).send(err);
  });
}


const UserEdit = async (req, res) => {
  const { id } = req.params;
  User.findOneAndUpdate({ _id: id }, req.body)
    .then((result) => {
      return res.status(SERVER_RESPONSE_CONSTANTS.SERVER_SUCCESS_CODE).send(result);
    })
    .catch((err) => {
      res.status(SERVER_RESPONSE_CONSTANTS.SERVER_ERROR_CODE).send(err);
    });
};

const UserUploadProfilePhoto = async (req, res) => {
  const { id } = req.params;


  if (!req.body || !req.file) {
    return res.status(CLIENT_RESPONSE_CONSTANTS.CLIENT_ERROR_CODE).send({
      status: CLIENT_RESPONSE_CONSTANTS.CLIENT_ERROR_STATUS,
      message: CLIENT_RESPONSE_CONSTANTS.CLIENT_ERROR_data,
      data: 'PLEASE GIVE ME AN IMAGE',
    });
  } else {
    const { secure_url } = await cloudinary.uploader.upload(req.file.path);
    fs.unlinkSync(req.file.path)


    User.findOneAndUpdate({ _id: id }, { profilePicture: secure_url })
      .then((result) => {
        return res.status(SERVER_RESPONSE_CONSTANTS.SERVER_SUCCESS_CODE)
          .send('Upload profile picture successfully');
      })
      .catch((err) => {
        res.status(SERVER_RESPONSE_CONSTANTS.SERVER_ERROR_CODE).send(err);
      });
  }
}

const UserResetPassword = async (req, res) => {
  const clientIp = req.body.client_ip
  const email = req.body.email.toLowerCase();
  if (!email) {
    return res.status(400).send({ err: 'Email is wrong' });
  }
  let user;
  try {
    user = await User.findOne({ email });
    if(!user){
      return res.status(404).send({ err: 'Email is not exist' });
    }
  } catch (err) {
    res.status(404).send({ err: 'Email is not exist' });
  }
 
  const token = usePasswordHashToMakeToken(user);
  const url = getPasswordResetURL(user, token,clientIp);
  const emailTemplate = resetPasswordTemplate(user, url);
  
  const sendEmail = () => {
    transporter.sendMail(emailTemplate, (err, info) => {
      if (err) {
        res.status(500).send({ err: 'Error sending email' });
      } else {
        console.log(`** Email sent **`, info);
        res.send({ res: 'Sent reset Email' });
      }
    });
  };

  sendEmail();
}


const UserReceiveNewPassword = async (req, res) => {
  const { userId, token } = req.params;
  const { password } = req.body;
  let data = {
    title: 'Security',
    body: `Reset Password Successfully.`,
  };

  // highlight-start
  const id = userId;
  const user = await User.findById(id).exec()
  if (!user) {
    res.status(SERVER_RESPONSE_CONSTANTS.SERVER_ERROR_CODE)
      .send(AUTHENTICATION_RESPONSE_CONSTANTS.USER_INVALID);
  }
  const secret = user.password + '-' + user.createdAt;


  const payload = jwt.decode(token, secret);
  if (payload._id === userId) {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    try {
      const updateUser = await User.findOneAndUpdate(
        { _id: userId },
        { password: hashedPassword },
        { $set: { "pushTokens": token } }
      );
      pushNotification(updateUser.pushTokens, data, ''),
        res.status(202).send('Password is changed');
    } catch (err) {
      res.status(500).send({ err });
    }
  } else {
    res.status(500).send({ err: 'Token is invalid' });
  }
}


export {
  UserRegister as USER_REGISTER,
  UserLogin as USER_LOGIN,
  UserEdit as USER_EDIT,
  UserUploadProfilePhoto as USER_UPLOAD_PHOTO,
  UserResetPassword as USER_RESET_PASSWORD,
  UserReceiveNewPassword as USER_RECEIVE_NEW_PASSWORD,
  UpdatePassword as USER_UPDATE_PASSWORD
}