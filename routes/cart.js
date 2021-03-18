import { Router } from 'express';
import { CREATE_CART, GET_CART } from '../controllers/cart';
const router = Router();

import verifyToken from '../middlewares/verifyToken'

router.get('/', verifyToken, GET_CART);

router.post('/', verifyToken,CREATE_CART);

// router.put('/cartitem/:id', verifyToken, cart_update);

// router.delete('/cartitem/:id', verifyToken, cart_deleteCartItem);

// router.delete('/:id', verifyToken, cart_delete);

export default router;
