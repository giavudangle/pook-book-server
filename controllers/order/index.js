import Order from '../../models/Order';
import User from '../../models/User';

import pushNotification from '../../middlewares/pushNotification';
import {v4} from 'uuid'

const stripe = require('stripe')(process.env.STRIPE_SECRET_TOKEN);

import {transporter,sendUserOrderTemplate} from '../../middlewares/email'

const GetOrders = async (req,res) => {
  try {
    const orders = await
    Order.find()
    .populate('items.item')
    .populate('userId')
    return res.status(200).send({
      status: "OK",
      message: "Get Orders Successfully",
      data: orders,
    });
  } catch(e) {
    return res.status(400).send({
      status: "ERR_SERVER",
      message: err.message,
      data: null,
    });
  }
}

/**
 * Send a order
 */

const CreateOrder = async (req, res) => {
  const { items, totalAmount } = req.body.orderInfo;
  //const { token } = req.body;
  const token = 'TEST CHARGE'
  const orders = items.map((item) => {
    return `itemID: ${item.item}, quantity:${item.quantity}`;
  });
  if (!req.body) {
    return res.status(200).send({
      status: "ERR_REQUEST",
      message: "Please check your request!",
      content: null,
    });
  }
  let content = {
    title: "Cập nhật đơn hàng",
    body: `Đơn hàng của bạn đã được đặt thành công.`,
  };


  const order = new Order(req.body.orderInfo);

  if (Object.keys(token).length !== 0) {
    try {
      stripe.charges.create({
        amount: totalAmount,
        currency: "usd",
        description: `Order Items: ${orders}`,
        source: 'tok_mastercard'
      });
    } catch (err) {
      res.send(err);
    }
  }
  try {
    const resOrder = await order.save();
    console.log('==============RES ORDER======================');
    console.log(resOrder);
    console.log('====================================');
    const user = await User.findById(resOrder.userId);
    pushNotification(user.pushTokens, content, "");
    transporter.sendMail(sendUserOrderTemplate(resOrder, user), (err, info) => {
      if (err) {
        res.status(500).send({ err: "Error sending email" });
      } else {
        console.log(`** Email sent **`, info);
      }
    });
    res.status(200).send({
      status: "OK",
      message: "Added Order Successfully",
      content: resOrder,
    });
  } catch (err) {
    return res.status(400).send({
      status: "ERR_SERVER",
      message: err.message,
      content: null,
    });
  }
};

const UpdateOrder = async (req, res) => {
  console.log('====================================');
  console.log(req);
  console.log('====================================');
  const { id } = req.params;
  const updateStatus = req.body.status;
  if (!req.params.id) {
    return res.status(200).send({
      status: "ERR_REQUEST",
      message: "Please check your ID request",
      content: null,
    });
  }
  let content = {
    title: "Cập nhật đơn hàng",
    body: `Đơn hàng ${id.substr(id.length - 10)} đã được ${updateStatus}.`,
  };
  try {
    const resOrder = await Order.findByIdAndUpdate(id, {
      status: updateStatus,
    });
    const user = User.findById(resOrder.userId);
    pushNotification(user.pushTokens, content, "");
    return res.status(200).send({
      status: "OK",
      message: "Updated Order Successfully",
      content: resOrder,
    });
  } catch (err) {
    return res.status(400).send({
      status: "ERR_SERVER",
      message: err.message,
      content: null,
    });
  }
};

export {
  GetOrders as GET_ORDERS,
  CreateOrder as CREATE_ORDER,
  UpdateOrder as UPDATE_ORDER
}