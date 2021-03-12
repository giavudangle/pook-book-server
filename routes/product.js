import express from 'express';
const ROUTER = express.Router();

import * as PRODUCT_CONTROLLER from '../controllers/product'
import { resize, upload } from '../middlewares/upload';

ROUTER.get('/',PRODUCT_CONTROLLER.GET_LIST_PRODUCTS)

ROUTER.post(
  '/',upload.single('imageUrl'),
  resize,
  PRODUCT_CONTROLLER.CREATE_PRODUCT);

ROUTER.patch(
  '/',
  upload.single('imageUrl'),
  resize,
  PRODUCT_CONTROLLER.UPDATE_PRODUCT);


export default ROUTER;