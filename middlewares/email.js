require('dotenv').config();
import nodemailer from 'nodemailer'

const host = process.env.HOST_NAME
const export_port = process.env.EXPO_PORT

const transporter = nodemailer.createTransport({
  host:"smtp.gmail.com",
  secure:true,
  port:465,
  service:'gmail',
  auth:{
    user:process.env.EMAIL_LOGIN,
    pass:process.env.EMAIL_PASSWORD
  }
})

// verify connection configuration
// transporter.verify((err,succ) => {
//   if(err){
//     console.log('====================================');
//     console.log(err);
//     console.log('====================================');
//   } else {
//     console.log('====================================');
//     console.log(succ);
//     console.log('====================================');
//   }
// })


//development
// const getPasswordResetURL = (user, token) =>
//   `http://${host}:8080/expo?userid=${user._id}&token=${token}`;

// production
const MOCK_SERVER = 'http://be5ccfb4ede0.ngrok.io'
const getPasswordResetURL = (user, token,clientIp) =>
  `${MOCK_SERVER}/expo?userid=${user._id}&token=${token}&client_ip=${clientIp}`; 

const resetPasswordTemplate = (user, url) => {
  const from = process.env.EMAIL_LOGIN;
  const to = user.email;
  const subject = "🚀 CodingwithVudang Password Reset 🚀";
  const html = ` 
  <p>Dear, ${user.name || user.email},</p>
  <p>Did you forget your password ?</p>
  <p> You can use the following link to reset your password:</p>
  <a href='${url}'>Click to Reset Your Password</a>
  <p>This link will expire in 15 minutes and can be used only once.</p>
  <p>If you don't want to change your password, please ignore and delete this message! </p>
  <p>Thank you,</p>
  <p>Your friend CodingwithVudang 🚀</p>
  <img src="https://res.cloudinary.com/codingwithvudang/image/upload/v1622100868/sz4scfp9eit31cqy8xnf.jpg" alt="logo" width="500" height="500" > 
  `;

  return { from, to, subject, html };
};

const registerUserTemplate = (user) => {
  const from = process.env.EMAIL_LOGIN;
  const to = user.email;
  const subject = "🚀 Register Account Successfully 🚀";
  const html = `
  <p>Dear, ${user.name} </p>
  <p>Thank you for registering for shopping at our store </p>
  <p>Your username is: ${user.email} </p>
  <p>If you have any questions please contact support</p>
  <p>Best regards,</p>
  <p>Your friend CodingwithVudang 🚀</p>
  <img src="https://res.cloudinary.com/codingwithvudang/image/upload/v1622100868/sz4scfp9eit31cqy8xnf.jpg" alt="logo" width="500" height="500" > 
  `;

  return { from, to, subject, html };
};

const sendUserOrderTemplate = (data, user) => {
  const from = process.env.EMAIL_LOGIN;
  const to = user.email;
  const subject = "🚀 Order Successfully, Your Order Information Below 🚀";
  const html = `
  
  <p>Dear, Customer </p>
  <p>Your order ID is: ${data._id} </p>
  <p>Status: ${data.status} </p>
  <p>Items ordered: ${data.items.length} </p>
  <p>Total: ${data.totalAmount} </p>
  <p>We will check your order and confirm it as soon as possible</p>
  <p>Thanks for choosing our store </p>
  <p>Warm hugs,</p>
  <p>Your friend CodingwithVudang 🚀</p>
  <img src="https://res.cloudinary.com/codingwithvudang/image/upload/v1622100868/sz4scfp9eit31cqy8xnf.jpg" alt="logo" width="500" height="500" > 
  `;

  return { from, to, subject, html };
};
export {
  transporter,
  getPasswordResetURL,
  resetPasswordTemplate,
  sendUserOrderTemplate,
  registerUserTemplate,
};
