import Order from '../../models/Order';
import User from '../../models/User';


import pushNotification from '../../middlewares/pushNotification';

const stripe = require('stripe')(process.env.STRIPE_SECRET_TOKEN);

import { transporter, sendUserOrderTemplate } from '../../middlewares/email'
import { MQTT_UpdateStock } from '../warehouse';

const GetOrders = async (req, res) => {
  try {

    // Nested population :))))
    // Because DB was designed by SQL-Mindset
    // Wrong architecture of No-SQL Database
    const orders = await
      Order.find()
        .populate([
          {
            path: 'items.item',
            populate: [{
              path: 'author',
              model: 'author'
            }]
          },
          {
            path: 'items.item',
            populate: [{
              path: 'category',
              model: 'category'
            }]
          },
          {
            path: 'items.item',
            populate: [{
              path: 'provider',
              model: 'provider'
            }]
          },
          {
            path: 'items.item',
            populate: [{
              path: 'publisher',
              model: 'publisher'
            }]
          },
        ])
        .populate('userId')
        .populate('paymentMethod')
        .populate('status')
    return res.status(200).send({
      status: "OK",
      message: "Get Orders Successfully",
      data: orders,
    });
  } catch (err) {
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

  // Get list items and total amount from client
  const { items, totalAmount } = req.body.orderInfo;

  // Get User token
  const { token } = req.body

  // Create form send to Stripe 
  const orderItemsSendToStripe = items.map((item) => {
    return `itemID: ${item.item}, quantity:${item.quantity}`;
  });


  if (!req.body) {
    return res.status(400).send({
      status: "ERR_REQUEST",
      message: "Please check your request!",
      data: null,
    });
  }

  // Mock notification
  let data = {
    title: "Cập nhật đơn hàng",
    body: `Đơn hàng của bạn đã được đặt thành công.`,
  };

  // Create new order via request.body.orderInfo
  const orderSentFromClient = new Order(req.body.orderInfo);

  // Check token of user can be charge
  if (Object.keys(token).length !== 0) {
    try {
      stripe.charges.create({
        amount: totalAmount,
        currency: "usd",
        description: `Order Items: ${orderItemsSendToStripe}`,
        source: token.id || 'tok_visa'
      });
    } catch (err) {
      res.send(err);
    }
  }

  try {
    // Save current order to the database
    const resOrder = await orderSentFromClient.save();
    // Decrese Stock in WareHouse
    const mappedOrder = orderSentFromClient.items

    mappedOrder.map(async element => {
      console.log(element);
      const flag = await
        MQTT_UpdateStock(element.item, element.quantity)
      if (!flag) {
        return res.status(400).send({
          status: "FAILED",
          message: "Product is out of stock",
          data: null,
        });
      }
    })

    // Find user 
    const user = await User.findById(resOrder.userId);

    // Push new notification to client
    pushNotification(user.pushTokens, data, "");

    // Send email via Nodemailer
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
      data: resOrder,
    });
  } catch (err) {
    return res.status(400).send({
      status: "ERR_SERVER",
      message: err.message,
      data: null,
    });
  }
};

const UpdateOrder = async (req, res) => {
  const { id } = req.params;
  const updateStatus = req.body.status;
  if (!req.params.id) {
    return res.status(400).send({
      status: "ERR_REQUEST",
      message: "Please check your ID request",
      data: null,
    });
  }
  let data = {
    title: "Cập nhật đơn hàng",
    body: `Đơn hàng ${id.substr(id.length - 10)} đã được ${updateStatus}.`,
  };
  try {
    const resOrder = await Order.findByIdAndUpdate(id, {
      status: updateStatus,
    });
    const user = User.findById(resOrder.userId);
    pushNotification(user.pushTokens, data, "");
    return res.status(200).send({
      status: "OK",
      message: "Updated Order Successfully",
      data: resOrder,
    });
  } catch (err) {
    return res.status(400).send({
      status: "ERR_SERVER",
      message: err.message,
      data: null,
    });
  }
};

const DeleteAllOrders = async (req, res) => {
  await Order.deleteMany({})
  return res.status(200).send({
    status: "OK",
    message: "Delete All Order Successfully",
  });
}

export {
  GetOrders as GET_ORDERS,
  CreateOrder as CREATE_ORDER,
  UpdateOrder as UPDATE_ORDER,
  DeleteAllOrders as DELETE_ALL_ORDERS
}