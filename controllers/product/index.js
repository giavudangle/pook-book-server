import Product from '../../models/Product';

const SERVER_ERROR_STATUS = 'SERVER ERROR'
const SERVER_ERROR_CONTENT = 'Something went wrong'
const CLIENT_ERROR_STATUS = 'SERVER ERROR'
const CLIENT_ERROR_CONTENT = 'Something went wrong in your intertract'

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
            data: data
          })
        })
        .catch((countErr) => {
          return res.json(countErr)
        })
    })
    .catch(err => {
      return res.status(400).send({
        status: SERVER_ERROR_STATUS,
        message: err.message,
        data: SERVER_ERROR_CONTENT
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
  const fileName = req.body.filename.replace(/ + /g,"");
  console.log('====================================');
  console.log(req);
  console.log('====================================');
  if(!req.body || !req.file){
    return (
      res.status(400).send({
        status: CLIENT_ERROR_STATUS,
        message: "Please check your upload phrase",
        content : CLIENT_ERROR_CONTENT
      })
    )
  }

  const IMAGE_SIZE = '255x144-'
  const imageUrl =`${host}/public/api/static/images
  /productPictures/${fileName}.jpg`
  const resizeUrl = `${host}/public/api/static/images
  /productPictures/${IMAGE_SIZE}/${fileName}.jpg`

  const product = new Product({
    filename: req.body.filename,
    price: req.body.price,
    color: req.body.color,
    origin: req.body.origin,
    standard: req.body.standard,
    description: req.body.description,
    url: imageUrl,
    thumb: resizeUrl,
    type: req.body.type,
    title:req.body.title
  })

  try {
    const savedProduct = await product.save()
    return res.status(200).send({
      status:"OK",
      message: "Added Product Successfully",
      data: savedProduct,
    })
  }catch(e) {
    return res.status(400).send({
      status: SERVER_ERROR_STATUS,
      message: e.message,
      data: null,
    });
  }


}




export { 
  GetListProducts as GET_LIST_PRODUCTS,
  CreateProduct as CREATE_PRODUCT
};