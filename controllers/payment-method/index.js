import {SERVER_RESPONSE_CONSTANTS} from '../../constants'
import PaymentMethod from '../../models/PaymentMethod';

const GetListPaymentMethods = async (req,res) => {
  try {
    const data = await PaymentMethod.find({});
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


const CreateNewPaymentMethod = async (req,res) => {
  let paymentMethod = new PaymentMethod({
    name:req.body.name,
    code:req.body.code
  })
  try {
    const savedPaymentMethod = await paymentMethod.save()
    return res.status(200).send({
      status: SERVER_RESPONSE_CONSTANTS.SERVER_SUCCESS_STATUS,
      message: SERVER_RESPONSE_CONSTANTS.SERVER_SUCCESS_CONTENT,
      data: savedPaymentMethod,
    })
  } catch (e) {
    return res.status(400).send({
      status: SERVER_RESPONSE_CONSTANTS.SERVER_ERROR_STATUS,
      message: e.message,
      data: null,
    });
  }
}

const DeleteAllPaymentMethods= async (req,res) => {
  await PaymentMethod.remove({})
  return res.status(200).send({
    status: SERVER_RESPONSE_CONSTANTS.SERVER_SUCCESS_STATUS,
    message: SERVER_RESPONSE_CONSTANTS.SERVER_SUCCESS_CONTENT,
  })
}


export {
  GetListPaymentMethods as GET_LIST_PAYMENT_METHODS,
  CreateNewPaymentMethod as CREATE_NEW_PAYMENT_METHOD,
  DeleteAllPaymentMethods as DELETE_ALL_PAYMENT_METHODS
}
