import Provider from '../../models/Provider'
import {SERVER_RESPONSE_CONSTANTS} from '../../constants'

const GetListProviders = async (req,res) => {
  try {
    const data = await Provider.find({});
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


const CreateNewProvider = async (req,res) => {
  let provider = new Provider({
    name:req.body.name,
  })
  try {
    const providerSaved = await provider.save()
    return res.status(200).send({
      status: SERVER_RESPONSE_CONSTANTS.SERVER_SUCCESS_STATUS,
      message: SERVER_RESPONSE_CONSTANTS.SERVER_SUCCESS_CONTENT,
      data: providerSaved,
    })
  } catch (e) {
    return res.status(400).send({
      status: SERVER_RESPONSE_CONSTANTS.SERVER_ERROR_STATUS,
      message: e.message,
      data: null,
    });
  }
}

const DeleteAllProviders = async (req,res) => {
  await Provider.remove({})
  return res.status(200).send({
    status: SERVER_RESPONSE_CONSTANTS.SERVER_SUCCESS_STATUS,
    message: SERVER_RESPONSE_CONSTANTS.SERVER_SUCCESS_CONTENT,
  })
}


export {
  GetListProviders as GET_LIST_PROVIDERS,
  CreateNewProvider as CREATE_NEW_PROVIDER,
  DeleteAllProviders as DELETE_ALL_PROVIDERS
}
