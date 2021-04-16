import Author from '../../models/Author'
import {SERVER_RESPONSE_CONSTANTS} from '../../constants'

const GetListAuthors = async (req,res) => {
  try {
    const data = await Author.find({});
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


const CreateNewAuthor = async (req,res) => {
  let author = new Author({
    name:req.body.name
  })
  try {
    const savedAuthor = await author.save()
    return res.status(200).send({
      status: SERVER_RESPONSE_CONSTANTS.SERVER_SUCCESS_STATUS,
      message: SERVER_RESPONSE_CONSTANTS.SERVER_SUCCESS_CONTENT,
      data: savedAuthor,
    })
  } catch (e) {
    return res.status(400).send({
      status: SERVER_RESPONSE_CONSTANTS.SERVER_ERROR_STATUS,
      message: e.message,
      data: null,
    });
  }
}

const DeleteAllAuthors = async (req,res) => {
  await Author.remove({})
  return res.status(200).send({
    status: SERVER_RESPONSE_CONSTANTS.SERVER_SUCCESS_STATUS,
    message: SERVER_RESPONSE_CONSTANTS.SERVER_SUCCESS_CONTENT,
  })
}


export {
  GetListAuthors as GET_LIST_AUTHORS,
  CreateNewAuthor as CREATE_NEW_AUTHOR,
  DeleteAllAuthors as DELETE_ALL_AUTHORS
}
