import {SERVER_RESPONSE_CONSTANTS} from '../../constants'
import Review from '../../models/Review';

const GetListReviewsByProduct = async (req,res) => {
  const {productID} = req.params;
  try {
    const data = await 
      Review.find({product:productID})
      .populate('product')
      .populate('user')
    return res.json({  
      data: data,
      status: SERVER_RESPONSE_CONSTANTS.SERVER_SUCCESS_STATUS
    })
  }catch{
    return res.status(SERVER_RESPONSE_CONSTANTS.SERVER_ERROR_CODE).send({
      status: SERVER_RESPONSE_CONSTANTS.SERVER_ERROR_STATUS,
      message: err.message,
      data: SERVER_RESPONSE_CONSTANTS.SERVER_ERROR_data
    })
  }
}


const GetListReviews = async (req,res) => {
  try {
    const data = await 
      Review.find({})
      .populate('product')
      .populate('user')
    return res.json({  
      data: data,
      status: SERVER_RESPONSE_CONSTANTS.SERVER_SUCCESS_STATUS
    })
  }catch{
    return res.status(SERVER_RESPONSE_CONSTANTS.SERVER_ERROR_CODE).send({
      status: SERVER_RESPONSE_CONSTANTS.SERVER_ERROR_STATUS,
      message: err.message,
      data: SERVER_RESPONSE_CONSTANTS.SERVER_ERROR_data
    })
  }
}


const CreateNewReview = async (req,res) => {
  const {content,product,user} = req.body;

  let review = new Review({
    content,
    product,
    user
  })
  try {
    await review.save();
    const data = await 
    Review.find({})
    .populate('product')
    .populate('user')    
    return res.status(200).send({
      status: SERVER_RESPONSE_CONSTANTS.SERVER_SUCCESS_STATUS,
      message: SERVER_RESPONSE_CONSTANTS.SERVER_SUCCESS_CONTENT,
      data: data,
    })
  } catch (e) {
    return res.status(400).send({
      status: SERVER_RESPONSE_CONSTANTS.SERVER_ERROR_STATUS,
      message: e.message,
      data: null,
    });
  }
}



export {
  GetListReviewsByProduct as GET_LIST_REVIEWS_BY_PRODUCT,
  CreateNewReview as CREATE_NEW_REVIEW,
  GetListReviews as GET_LIST_REVIEWS
}
