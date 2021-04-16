import Publisher from '../../models/Publisher'
import {SERVER_RESPONSE_CONSTANTS} from '../../constants'

const GetListPublishers = async (req,res) => {
  try {
    const data = await Publisher.find({});
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


const CreateNewPublisher = async (req,res) => {
  let publisher = new Publisher({
    name:req.body.name,
  })
  try {
    const publisherSaved = await publisher.save()
    return res.status(200).send({
      status: SERVER_RESPONSE_CONSTANTS.SERVER_SUCCESS_STATUS,
      message: SERVER_RESPONSE_CONSTANTS.SERVER_SUCCESS_CONTENT,
      data: publisherSaved,
    })
  } catch (e) {
    return res.status(400).send({
      status: SERVER_RESPONSE_CONSTANTS.SERVER_ERROR_STATUS,
      message: e.message,
      data: null,
    });
  }
}

const DeleteAllPublishers = async (req,res) => {
  await Publisher.remove({})
  return res.status(200).send({
    status: SERVER_RESPONSE_CONSTANTS.SERVER_SUCCESS_STATUS,
    message: SERVER_RESPONSE_CONSTANTS.SERVER_SUCCESS_CONTENT,
  })
}


export {
  GetListPublishers as GET_LIST_PUBLISHERS,
  CreateNewPublisher as CREATE_NEW_PUBLISHER,
  DeleteAllPublishers as DELETE_ALL_PUBLISHERS
}
