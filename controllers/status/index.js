import {SERVER_RESPONSE_CONSTANTS} from '../../constants'
import Status from '../../models/Status';

const GetListStatus = async (req,res) => {
  try {
    const data = await Status.find({});
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


const CreateNewStatus = async (req,res) => {
  let status = new Status({
    name:req.body.name,
    code:req.body.code
  })
  try {
    const savedStatus = await status.save()
    return res.status(200).send({
      status: SERVER_RESPONSE_CONSTANTS.SERVER_SUCCESS_STATUS,
      message: SERVER_RESPONSE_CONSTANTS.SERVER_SUCCESS_CONTENT,
      data: savedStatus,
    })
  } catch (e) {
    return res.status(400).send({
      status: SERVER_RESPONSE_CONSTANTS.SERVER_ERROR_STATUS,
      message: e.message,
      data: null,
    });
  }
}

const DeleteAllStatus= async (req,res) => {
  await Status.remove({})
  return res.status(200).send({
    status: SERVER_RESPONSE_CONSTANTS.SERVER_SUCCESS_STATUS,
    message: SERVER_RESPONSE_CONSTANTS.SERVER_SUCCESS_CONTENT,
  })
}


export {
  GetListStatus as GET_LIST_STATUS,
  CreateNewStatus as CREATE_NEW_STATUS,
  DeleteAllStatus as DELETE_ALL_STATUS
}
