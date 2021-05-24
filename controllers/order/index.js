import Order from '../../models/Order';
import User from '../../models/User';


import pushNotification from '../../middlewares/pushNotification';

const stripe = require('stripe')(process.env.STRIPE_SECRET_TOKEN);

import { transporter, sendUserOrderTemplate } from '../../middlewares/email'
import { MQTT_DecreaseStocksByProductID } from '../product';

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
|--------------------------------------------------
| CREATE NEW ORDER METHOD
|--------------------------------------------------
*/

const CreateOrder = async (req, res) => {

  try {
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

    // Check token of user can be charge
    if (Object.keys(token).length !== 0) {
      try {
        stripe.charges.create({
          amount: totalAmount,
          currency: "vnd",
          description: `Pookbook's clients Order Items: ${orderItemsSendToStripe}`,
          source: token.id || 'tok_visa'
        });
      } catch (err) {
        res.send(err);
      }
    }

    const state = req.body.orderInfo;

    const orderSaveToDB = new Order({
      userId: state.userId,
      items: state.items,
      name: state.name,
      totalAmount: state.totalAmount,
      address: state.address,
      phone: state.phone,
      paymentMethod: state.paymentMethod,

    })
    orderSaveToDB
      .save()
      .then((savedOrder) => {
        const listItems = req.body.orderInfo.items;

        Promise.all(listItems.map(async (item) => {
          const flag = await MQTT_DecreaseStocksByProductID(item.item, item.quantity)
          if (!flag) {
            return res.status(400).send({
              status: "ERR_REQUEST",
              message: `Once or more item is out of stocks`,
            });
          }
        }))

        // Find user 
        User.findOne(savedOrder.userId)
          .then(user => {
            // Push new notification to client
            let data = {
              title: "Cập nhật đơn hàng",
              body: `Đơn hàng của bạn đã được đặt thành công.`,
            }
            pushNotification(user.pushTokens, data, "");

            //Send email via Nodemailer
            transporter.sendMail(sendUserOrderTemplate(savedOrder, user), (err, info) => {
              if (err) {
                console.log(`** Email err **`, err);
              } else {
                console.log(`** Email sent **`, info);
              }
            });
            res.status(200).send({
              status: "OK",
              message: "Added Order Successfully",
              data: savedOrder,
            });

          })
          .catch(e => {
            res.status(400).send({
              status: "ERR_REQUEST",
              message: e,
            });
          })
      })
  } catch (err) {
    res.status(400).send({
      status: "ERR_SERVER",
      message: err,

    });
  }
}

/**
|--------------------------------------------------
| UPDATE ORDER METHOD
|--------------------------------------------------
*/

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

/**
|--------------------------------------------------
| DELETE ALL ORDER METHOD
|--------------------------------------------------
*/

const DeleteAllOrders = async (req, res) => {
  await Order.deleteMany({})
  return res.status(200).send({
    status: "OK",
    message: "Delete All Order Successfully",
  });
}

const DeleteOrder = async (req, res) => {
  const { orderId } = req.params;

  await Order.findOneAndRemove({ _id: orderId })
  return res.status(200).send({
    status: "OK",
    message: "Delete Order Successfully",
  });
}



export {
  GetOrders as GET_ORDERS,
  CreateOrder as CREATE_ORDER,
  UpdateOrder as UPDATE_ORDER,
  DeleteAllOrders as DELETE_ALL_ORDERS,
  DeleteOrder as DELETE_ORDER
}