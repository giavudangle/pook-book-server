/* eslint-disable consistent-return */
import Favorite from "../../models/Favorite";

const GetFavorites = (req, res) => {
  Favorite.find()
    .populate({
      path:'items.item',
      populate:{
        path:'author',
      }
    })
    .populate({
      path:'items.item',
      populate:{
        path:'category',
      }
    })
    .populate({
      path:'items.item',
      populate:{
        path:'provider',
      }
    })
    .populate({
      path:'items.item',
      populate:{
        path:'publisher',
      }
    })
    .then((data) => {
      return res.status(200).send({
        status: "OK",
        message: "Get Users Favorite List Successfully",
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
};

const PostFavorite = (req, res) => {
  if (!req.body) {
    return res.status(200).send({
      status: "ERR_REQUEST",
      message: "Please check your request!",
      data: null,
    });
  }
  Favorite.findOne({ userId: req.body.userId }, (err, result) => {
    if (err) {
      return res.status(404).send({
        status: "ERR_SERVER",
        message: err.message,
        data: null,
      });
    }
    console.log(result);
    // {
    //   _id: 6087c9ca66a27d4230f61d9e,
    //   userId: '6081a65c13f3e21db7724b3a',
    //   items: [ null ],
    //   createdAt: 2021-04-27T08:22:34.050Z,
    //   updatedAt: 2021-05-16T08:11:06.819Z,
    //   __v: 5
    // }

    // {
    //   userId: '6081a65c13f3e21db7724b3a',
    //   items: [ { item: '6088e6fa83287d03fb4b2380' } ]
    // }


    if (result) {
      result.items.push(req.body.items[0]);
      result
        .save()
        .then((data) => {
          return res.status(200).send({
            status: "OK",
            message: "Added Favorite Item Successfully",
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
    } else {
      const favorite = new Favorite({
        userId: req.body.userId,
        items: req.body.items
      });
      favorite
        .save()
        .then((data) => {
          return res.status(200).send({
            status: "OK",
            message: "Added Favorite Item Successfully",
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
  });
};

const DeleteFavoriteItem = (req, res) => {
  const { userId } = req.params;
  const { item } = req.body;
  if (!req.body || !req.params.userId) {
    return res.status(200).send({
      status: "ERR_REQUEST",
      message: "Please check your ID request",
      data: null,
    });
  }
  Favorite.findOne({ userId: userId }, (err, result) => {
    if (err) {
      console.log(err);
    }
    const favoriteIndex = result.items.findIndex((product) => {
      return product.toString() === item;
    });
    console.log(favoriteIndex);
    result.items.splice(favoriteIndex, 1);
    result.save();
  })
    .then((data) => {
      return res.status(200).send({
        status: "OK",
        message: "Remove Favorite Item Successfully",
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
};




export {
  GetFavorites as GET_FAVORITES,
  PostFavorite as POST_FAVORITE,
  DeleteFavoriteItem as DELETE_FAVORITE_ITEM,
};

