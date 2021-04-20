import WareHouse from "../../models/WareHouse"
import {SERVER_RESPONSE_CONSTANTS} from '../../constants'


const GetListProductsInWareHouse = async (req,res) => {
  try {
    const data = await WareHouse.find({}).populate('product')
    return res.json({
      data: data,
      status: SERVER_RESPONSE_CONSTANTS.SERVER_SUCCESS_STATUS
    })
  } catch(err) {
    res.status(SERVER_RESPONSE_CONSTANTS.SERVER_ERROR_CODE).send({
      status: SERVER_RESPONSE_CONSTANTS.SERVER_ERROR_STATUS,
      message: SERVER_RESPONSE_CONSTANTS.SERVER_ERROR_CONTENT,
      error : err.message
    })
  }
}

const CheckAvailableProductInWareHouse = async (req,res) => {
  const {productId} = req.params
  try {
    const productInWareHouse = await WareHouse.findOne({}).populate('product').where('product').equals(productId)
    if (parseInt(productInWareHouse.stock) > 0) {
      return res.json({
        data: productInWareHouse,
        status: SERVER_RESPONSE_CONSTANTS.SERVER_SUCCESS_STATUS,
        available: true
      })
    } else {
      return res.json({
        status: SERVER_RESPONSE_CONSTANTS.SERVER_SUCCESS_STATUS,
        available: false,
        message: "This product is out of stock"
      })
    }

    
  } catch(err) {
    res.status(SERVER_RESPONSE_CONSTANTS.SERVER_ERROR_CODE).send({
      status: SERVER_RESPONSE_CONSTANTS.SERVER_ERROR_STATUS,
      message: err.message,
      data: SERVER_RESPONSE_CONSTANTS.SERVER_ERROR_CONTENT
    })
  }
}

const addNewProductToWareHouse = async (req,res) => {
  const {stock,productId} = req.body;
  const wareHouseProduct = new WareHouse({
    product:productId,
    stock
  })

  try {
    const data = await wareHouseProduct.save();
    return res.json({
      data: data,
      status: SERVER_RESPONSE_CONSTANTS.SERVER_SUCCESS_STATUS,
      message: SERVER_RESPONSE_CONSTANTS.SERVER_SUCCESS_CONTENT
    }) 
  } catch(err) {
    res.status(SERVER_RESPONSE_CONSTANTS.SERVER_ERROR_CODE).send({
      status: SERVER_RESPONSE_CONSTANTS.SERVER_ERROR_STATUS,
      message: SERVER_RESPONSE_CONSTANTS.SERVER_ERROR_CONTENT,
      error:err.message
    })
  }
}


// Write a function that update stocks of product by product id
// input : productId
// output : stock

const updateStockByProductId = async (product,stocks) => {
  const {stock} = await WareHouse.findOne({product})
  const test = parseInt(stock) - parseInt(stocks) 
  if (test < 0) {
    return false
  }
 await WareHouse.updateOne({product},{stock : test})
 return true
}


const updateProductInWareHouse = async (req,res) => {
  const {stock} = req.body;
  const {id} = req.params;

  try {
    const data = await WareHouse.findOneAndUpdate({_id:id},{stock})
    return res.json({
      data: data,
      status: SERVER_RESPONSE_CONSTANTS.SERVER_SUCCESS_STATUS,
      message: SERVER_RESPONSE_CONSTANTS.SERVER_SUCCESS_CONTENT
    }) 
  } catch {
    res.status(SERVER_RESPONSE_CONSTANTS.SERVER_ERROR_CODE).send({
      status: SERVER_RESPONSE_CONSTANTS.SERVER_ERROR_STATUS,
      message: err.message,
      data: SERVER_RESPONSE_CONSTANTS.SERVER_ERROR_CONTENT
    })
  }
}


const deleteAllProductsInWareHouse = async (req,res) => {
  await WareHouse.remove({});
  return res.json({
    status: SERVER_RESPONSE_CONSTANTS.SERVER_SUCCESS_STATUS,
    message: SERVER_RESPONSE_CONSTANTS.SERVER_SUCCESS_CONTENT,
  }) 
}


export {
  GetListProductsInWareHouse as GET_LIST_PRODUCTS_IN_WAREHOUSE,
  CheckAvailableProductInWareHouse as CHECK_AVAILABLE_PRODUCT,
  addNewProductToWareHouse as ADD_NEW_PRODUCT_TO_WAREHOUSE,
  updateProductInWareHouse as UPDATE_PRODUCT_IN_WAREHOUSE,
  deleteAllProductsInWareHouse as DELETE_ALL_PRODUCTS_IN_WAREHOUSE,
  updateStockByProductId as MQTT_UpdateStock
}