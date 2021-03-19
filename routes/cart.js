import { Router } from 'express';
import { CREATE_CART, GET_CART, UPDATE_CART,DELETE_CART_ITEM, DELETE_CART } from '../controllers/cart';
const router = Router();

import verifyToken from '../middlewares/verifyToken'

router.get('/', verifyToken, GET_CART);

router.post('/', verifyToken,CREATE_CART);

router.put('/:id', verifyToken, UPDATE_CART);

router.delete('/cartitem/:id', verifyToken, DELETE_CART_ITEM);

router.delete('/:id', verifyToken, DELETE_CART);

export default router;
