
import {SERVER_RESPONSE_CONSTANTS} from '../../constants'
import Promotion from '../../models/Promotion';

const GetListPromotions = async (req,res) => {
  try {
    const data = await Promotion.find({});
    return res.json({  
      data: data,
      status: SERVER_RESPONSE_CONSTANTS.SERVER_SUCCESS_STATUS
    })
  }catch{
    return res.status(SERVER_RESPONSE_CONSTANTS.SERVER_ERROR_CODE).send({
      status: SERVER_RESPONSE_CONSTANTS.SERVER_ERROR_STATUS,
      message: err.message,
      data: SERVER_RESPONSE_CONSTANTS.SERVER_ERROR_CONTENT
    })
  }
}

const CreateNewPromotion = async (req,res) => {
  let promotion = new Promotion({
    name:req.body.name,
    code : req.body.code,
    value : req.body.value,
    imageUrl : req.body.imageUrl,
    code : req.body.code,
    expiredAt : req.body.expiredAt

  })
  try {
    const savedPromotion = await promotion.save()
    return res.status(200).send({
      status: SERVER_RESPONSE_CONSTANTS.SERVER_SUCCESS_STATUS,
      message: SERVER_RESPONSE_CONSTANTS.SERVER_SUCCESS_CONTENT,
      data: savedPromotion,
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
  GetListPromotions as GET_LIST_PROMOTIONS,
  CreateNewPromotion as CREATE_NEW_PROMOTION,
}
