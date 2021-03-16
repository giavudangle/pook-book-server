require('dotenv').config();
import nodemailer from 'nodemailer'

const host = process.env.HOST_NAME

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


const getPasswordResetURL = (user, token) =>
  `http://${host}:8080/expo?userid=${user._id}&token=${token}`;

const resetPasswordTemplate = (user, url) => {
  console.log('================URL EMAIL====================');
  console.log(url);
  console.log('====================================');
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
  <img src="https://scontent.fsgn2-1.fna.fbcdn.net/v/t1.0-9/151284066_207254161142817_5812038792384707893_n.png?_nc_cat=105&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=pRGC33VnrYgAX8pPhJm&_nc_ht=scontent.fsgn2-1.fna&oh=df9a2f46200a1047c3ef4cfb402f245e&oe=6071E763" alt="logo" width="500" height="500" > 
  `;

  return { from, to, subject, html };
};

const registerUserTemplate = (user) => {
  const from = process.env.EMAIL_LOGIN;
  const to = user.email;
  const subject = "🚀 Đăng Ký Tài Khoản Thành Công 🚀";
  const html = `
  <p>Dear, ${user.name} </p>
  <p>Thank you for registering for shopping at our store </p>
  <p>Your username is: ${user.email} </p>
  <p>If you have any questions please contact support</p>
  <p>Best regards,</p>
  <p>Your friend CodingwithVudang 🚀</p>
  <img src="https://scontent.fsgn2-1.fna.fbcdn.net/v/t1.0-9/151284066_207254161142817_5812038792384707893_n.png?_nc_cat=105&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=pRGC33VnrYgAX8pPhJm&_nc_ht=scontent.fsgn2-1.fna&oh=df9a2f46200a1047c3ef4cfb402f245e&oe=6071E763" alt="logo" width="500" height="500" > 
  `;

  return { from, to, subject, html };
};

const sendUserOrderTemplate = (data, user) => {
  const from = process.env.EMAIL_LOGIN;
  const to = user.email;
  const subject = "🚀 Đặt hàng thành công, thông tin đơn hàng của bạn 🚀";
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
  <img src="https://scontent.fsgn2-1.fna.fbcdn.net/v/t1.0-9/151284066_207254161142817_5812038792384707893_n.png?_nc_cat=105&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=pRGC33VnrYgAX8pPhJm&_nc_ht=scontent.fsgn2-1.fna&oh=df9a2f46200a1047c3ef4cfb402f245e&oe=6071E763" alt="logo" width="500" height="500" > 
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
