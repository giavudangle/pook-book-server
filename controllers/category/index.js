import Category from '../../models/Category'
import {SERVER_RESPONSE_CONSTANTS} from '../../constants'

const GetListCategories = async (req,res) => {
  try {
    const data = await Category.find({});
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


const CreateNewCategory = async (req,res) => {
  let category = new Category({
    name:req.body.name,
    code : req.body.code
  })
  try {
    const savedCategory = await category.save()
    return res.status(200).send({
      status: SERVER_RESPONSE_CONSTANTS.SERVER_SUCCESS_STATUS,
      message: SERVER_RESPONSE_CONSTANTS.SERVER_SUCCESS_CONTENT,
      data: savedCategory,
    })
  } catch (e) {
    return res.status(400).send({
      status: SERVER_RESPONSE_CONSTANTS.SERVER_ERROR_STATUS,
      message: e.message,
      data: null,
    });
  }
}

const DeleteAllCategories = async (req,res) => {
  await Category.remove({})
  return res.status(200).send({
    status: SERVER_RESPONSE_CONSTANTS.SERVER_SUCCESS_STATUS,
    message: SERVER_RESPONSE_CONSTANTS.SERVER_SUCCESS_CONTENT,
  })
}


export {
  GetListCategories as GET_LIST_CATEGORIES,
  CreateNewCategory as CREATE_NEW_CATEGORY,
  DeleteAllCategories as DELETE_ALL_CATEGORIES
}
