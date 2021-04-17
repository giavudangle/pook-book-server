import { Router } from 'express';
import { 
  GET_LIST_PRODUCTS_IN_WAREHOUSE,
  ADD_NEW_PRODUCT_TO_WAREHOUSE,UPDATE_PRODUCT_IN_WAREHOUSE,
  CHECK_AVAILABLE_PRODUCT,DELETE_ALL_PRODUCTS_IN_WAREHOUSE} 
from '../controllers/warehouse';

const router = Router();

router.get('/', GET_LIST_PRODUCTS_IN_WAREHOUSE);
router.post('/',ADD_NEW_PRODUCT_TO_WAREHOUSE)
router.patch('/:id',UPDATE_PRODUCT_IN_WAREHOUSE)
router.get('/:productId',CHECK_AVAILABLE_PRODUCT )
router.delete('/',DELETE_ALL_PRODUCTS_IN_WAREHOUSE)

export default router;

