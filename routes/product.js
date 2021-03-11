import express from 'express';
const ROUTER = express.Router();

import * as PRODUCT_CONTROLLER from '../controllers/product'

ROUTER.get('/',PRODUCT_CONTROLLER.GET_LIST_PRODUCTS)

ROUTER.post('/',PRODUCT_CONTROLLER.CREATE_PRODUCT)
export default ROUTER;