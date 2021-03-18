import Cart from '../../models/Cart';

const GetCart = (req,res) => {
  Cart.find()
    .populate('items.item')
    .then((data) => {
      return res.status(200).send({
        status: "OK",
        message: "Get Users Carts Successfully",
        data: data,
      });
    })
    .catch((err) => {
      return res.status(400).send({
        status: "ERR_SERVER",
        message: err.message,
        data: null,
      });
    });
}


const CreateCart = (req, res) => {
  if (!req.body) {
    return res.status(200).send({
      status: "ERR_REQUEST",
      message: "Please check your request!",
      data: null,
    });
  }
  Cart.findOne({ userId: req.body.userId }, (err, result) => {
    if (err) {
      return res.status(404).send({
        status: "ERR_SERVER",
        message: err.message,
        content: null,
      });
    }
    if (result) {
      const item = req.body.items[0].item;
      const cartIndex = result.items.findIndex((cart) => {
        return cart.item.toString() === item;
      });
      if (cartIndex < 0) {
        result.items.push(req.body.items[0]);
        result
          .save()
          .then((data) => {
            return res.status(200).send({
              status: "OK",
              message: "Added Cart Successfully",
              content: data,
            });
          })
          .catch((err) => console.log(err));
      } else {
        console.log('====================================');
        console.log('In else');
        console.log('====================================');
        result.items[cartIndex].quantity = (
          Number(result.items[cartIndex].quantity) + 1
        ).toString();
        result
          .save()
          .then((data) => {
            return res.status(200).send({
              status: "OK",
              message: "Added Cart Successfully",
              content: data,
            });
          })
          .catch((err) => console.log(err));
      }
    } else {
      const cart = new Cart({
        userId: req.body.userId,
        items: req.body.items[0],
      });
      cart
        .save()
        .then((data) => {
          return res.status(200).send({
            status: "OK",
            message: "Added Cart Successfully",
            content: data,
          });
        })
        .catch((err) => console.log(err));
    }
  }).catch((err) => {
    return res.status(400).send({
      status: "ERR_SERVER",
      message: err.message,
      content: null,
    });
  });
 
};


export {
  GetCart as GET_CART,
  CreateCart as CREATE_CART
}