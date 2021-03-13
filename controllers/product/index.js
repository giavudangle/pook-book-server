import { CLIENT_RESPONSE_CONSTANTS, SERVER_RESPONSE_CONSTANTS } from '../../constants';
import Product from '../../models/Product';



/**
 * Get List Of Product In Database
 * @param req : {page,limit}
 * @param res : {data,total,pageSize,page}
 */

const GetListProducts = (req, res) => {
  let page = parseInt(req.query.page) || 0;
  let limit = parseInt(req.query.limit) || 0;

  Product.find()
    .sort(page * limit)
    .skip(page * limit)
    .limit(limit)
    .exec()
    .then((data) => {
      Product
        .countDocuments()
        .exec()
        .then((countResult) => {
          return res.json({
            total: countResult,
            page: page,
            pageSize: data.length,
            data: data,
            status: SERVER_RESPONSE_CONSTANTS.SERVER_SUCCESS_STATUS
          })
        })
        .catch((countErr) => {
          return res.json(countErr)
        })
    })
    .catch(err => {
      return res.status(SERVER_RESPONSE_CONSTANTS.SERVER_ERROR_CODE).send({
        status: SERVER_RESPONSE_CONSTANTS.SERVER_ERROR_STATUS,
        message: err.message,
        data: SERVER_RESPONSE_CONSTANTS.SERVER_ERROR_CONTENT
      })
    })

}

/**
 * POST A PRODUCT TO SERVER
 * @param req 
 * @param res
 */

const CreateProduct = async (req, res) => {
  const host = process.env.HOST_NAME;
  const port = process.env.PORT;

  const fileName = req.file.filename;

  if (!req.body || !req.file) {
    return (
      res.status(400).send({
        status: CLIENT_RESPONSE_CONSTANTS.CLIENT_ERROR_STATUS,
        message: CLIENT_RESPONSE_CONSTANTS.CLIENT_UPLOAD_ERROR,
        data: null
      })
    )
  }


  const IMAGE_SIZE = '256x144-'
  const imageUrl = `${host}:${port}/public/api/static/images/productPictures/${fileName}`
  const resizeUrl = `${host}:${port}/public/api/static/images/productPictures/${IMAGE_SIZE}${fileName}`

  const product = new Product({
    filename: req.file.filename,
    price: req.body.price,
    color: req.body.color,
    origin: req.body.origin,
    standard: req.body.standard,
    description: req.body.description,
    url: imageUrl,
    thumb: resizeUrl,
    type: req.body.type,
    title: req.body.title
  })

  try {
    const savedProduct = await product.save()
    return res.status(200).send({
      status: SERVER_RESPONSE_CONSTANTS.SERVER_SUCCESS_STATUS,
      message: SERVER_RESPONSE_CONSTANTS.SERVER_SUCCESS_CONTENT,
      data: savedProduct,
    })
  } catch (e) {
    return res.status(400).send({
      status: SERVER_RESPONSE_CONSTANTS.SERVER_ERROR_STATUS,
      message: e.message,
      data: null,
    });
  }


}

/**
 * UPDATE A PRODUCT FROM SERVER
 * @param req 
 * @param res
 */

const UpdateProduct = async (req, res) => {
  const id = req.params.id;
  const host = process.env.HOST_NAME;
  const port =process.env.PORT;

  let filename = '';
  let imageUrl = '';
  let resizeUrl = '';
  const IMAGE_SIZE = '256x144-'

  if (!req.params.id || !req.body) {
    return res.status(CLIENT_RESPONSE_CONSTANTS.CLIENT_ERROR_CODE)
      .send({
        status: CLIENT_RESPONSE_CONSTANTS.CLIENT_ERROR_STATUS,
        message: CLIENT_RESPONSE_CONSTANTS.CLIENT_ERROR_CONTENT,
        content: null
      })
  }

  if (req.file) {
    filename = await req.file.filename
    imageUrl = `${host}:${port}/public/api/static/images/productPictures/${filename}`
    resizeUrl = `${host}:${port}/public/api/static/images/productPictures/${IMAGE_SIZE}${filename}`
  }

  const product = req.file
    ? {
      filename: req.file.filename,
      price: req.body.price,
      color: req.body.color,
      origin: req.body.origin,
      standard: req.body.standard,
      description: req.body.description,
      url: imageUrl,
      thumb: resizeUrl,
      type: req.body.type,
      title: req.body.title
      }
    : req.body;
  try {
    const newProduct = await Product.findByIdAndUpdate(id, product).exec()
    return res.status(SERVER_RESPONSE_CONSTANTS.SERVER_SUCCESS_CODE).send({
      status: SERVER_RESPONSE_CONSTANTS.SERVER_SUCCESS_STATUS,
      message: "Updated Product Successfully",
      data: newProduct,
    });
  } catch {
    return res.status(SERVER_RESPONSE_CONSTANTS.SERVER_ERROR_CODE).send({
      status: SERVER_RESPONSE_CONSTANTS.SERVER_ERROR_STATUS,
      message: err.message,
      content: null,
    });
  }
}

/**
 * DELETE A PRODUCT FROM SERVER
 * @param req 
 * @param res
 */

const DeleteProduct = async (req,res) => {
  const id = req.params.id;
  if(!id){
    return res.status(CLIENT_RESPONSE_CONSTANTS.CLIENT_ERROR_CODE)
      .send({
        status:CLIENT_RESPONSE_CONSTANTS.CLIENT_ERROR_STATUS,
        message:CLIENT_RESPONSE_CONSTANTS.CLIENT_ERROR_CONTENT,
        status:false
      })
  }
  try {
    await Product.findByIdAndDelete(id).exec();
    return res.status(SERVER_RESPONSE_CONSTANTS.SERVER_SUCCESS_CODE)
      .send({
        status:SERVER_RESPONSE_CONSTANTS.SERVER_SUCCESS_STATUS,
        messsage: "Delete Product Successfully",
      })
  } catch(ex) {
    return res.status(SERVER_RESPONSE_CONSTANTS.SERVER_ERROR_CODE).send({
      status: SERVER_RESPONSE_CONSTANTS.SERVER_ERROR_STATUS,
      message: ex.message,
      data: null,
    });
  }
}


export {
  GetListProducts as GET_LIST_PRODUCTS,
  CreateProduct as CREATE_PRODUCT,
  UpdateProduct as UPDATE_PRODUCT,
  DeleteProduct as DELETE_PRODUCT
};






















