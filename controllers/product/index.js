import { CLIENT_RESPONSE_CONSTANTS, SERVER_RESPONSE_CONSTANTS } from '../../constants';
import Product from '../../models/Product';
import fs from 'fs'
import cloudinary from '../../middlewares/cloudinary'


/**
 * Get List Of Product In Database
 * @param req : {page,limit}
 * @param res : {data,total,pageSize,page}
 */

const GetListProducts = (req, res) => {
  let page = parseInt(req.query.page) || 0;
  let limit = parseInt(req.query.limit) || 0;

  Product
    .find()
    .populate('author')
    .populate('publisher')
    .populate('provider')
    .populate('category')
    .sort(page * limit)
    .skip(page * limit)
    .limit(limit)
    .exec()
    .then((data) => {
      console.log('====================================');
      console.log(data);
      console.log('====================================');
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
 * @req data sent from client
 * @res product has been created
 */

const CreateProduct = async (req, res) => {
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
  const originalImagePath =
    `public/api/static/images/productPictures/${fileName}`
  const croppedImagePath =
    `public/api/static/images/productPictures/256x144-${fileName}`

  // We can optimize upload phase here
  let cloudinaryResultRaw = await cloudinary.uploader.upload(originalImagePath)
  let cloudinaryResultCropped = await cloudinary.uploader.upload(croppedImagePath)


  fs.unlinkSync(originalImagePath)
  fs.unlinkSync(croppedImagePath)




  const product = new Product({
    filename: req.file.filename,
    title: req.body.title,
    price: req.body.price,
    description: req.body.description,
    url: cloudinaryResultRaw.secure_url,
    thumb: cloudinaryResultCropped.secure_url,
    author: req.body.authorId,
    category: req.body.categoryId,
    provider: req.body.providerId,
    publisher: req.body.publisherId
  })

  try {
    const savedProduct = await product.save()
    return res.status(200).send({
      status: SERVER_RESPONSE_CONSTANTS.SERVER_SUCCESS_STATUS,
      message: SERVER_RESPONSE_CONSTANTS.SERVER_SUCCESS_data,
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
  const fileName = req.file.filename;

  if (!req.params.id || !req.body) {
    return res.status(CLIENT_RESPONSE_CONSTANTS.CLIENT_ERROR_CODE)
      .send({
        status: CLIENT_RESPONSE_CONSTANTS.CLIENT_ERROR_STATUS,
        message: CLIENT_RESPONSE_CONSTANTS.CLIENT_ERROR_data,
        data: null
      })
  }


  const originalImagePath =
    `public/api/static/images/productPictures/${fileName}`
  const croppedImagePath =
    `public/api/static/images/productPictures/256x144-${fileName}`

  let cloudinaryResultRaw = await cloudinary.uploader.upload(originalImagePath)
  let cloudinaryResultCropped = await cloudinary.uploader.upload(croppedImagePath)


  fs.unlinkSync(originalImagePath)
  fs.unlinkSync(croppedImagePath)


  const product = req.file
    ? {
      filename: req.file.filename,
      title: req.body.title,
      price: req.body.price,
      description: req.body.description,
      url: cloudinaryResultRaw.secure_url,
      thumb: cloudinaryResultCropped.secure_url,
      author: req.body.authorId,
      category: req.body.categoryId,
      provider: req.body.providerId,
      publisher: req.body.publisherId
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
      data: null,
    });
  }
}

/**
 * DELETE A PRODUCT FROM SERVER
 * @param req 
 * @param res
 */

const DeleteProduct = async (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.status(CLIENT_RESPONSE_CONSTANTS.CLIENT_ERROR_CODE)
      .send({
        status: CLIENT_RESPONSE_CONSTANTS.CLIENT_ERROR_STATUS,
        message: CLIENT_RESPONSE_CONSTANTS.CLIENT_ERROR_data,
        status: false
      })
  }
  try {
    await Product.findByIdAndDelete(id).exec();
    return res.status(SERVER_RESPONSE_CONSTANTS.SERVER_SUCCESS_CODE)
      .send({
        status: SERVER_RESPONSE_CONSTANTS.SERVER_SUCCESS_STATUS,
        messsage: "Delete Product Successfully",
      })
  } catch (ex) {
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






















