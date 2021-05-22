import { Router } from 'express';
import { CREATE_ORDER, DELETE_ALL_ORDERS, DELETE_ORDER, GET_ORDERS, UPDATE_ORDER } from '../controllers/order';
const router = Router();
import verifyToken from '../middlewares/verifytoken';

// router.get('/', verifyToken, order_get);
// router.patch('/:id', verifyToken, order_update);

router.get('/',verifyToken,GET_ORDERS);
router.post('/', verifyToken, CREATE_ORDER);
router.patch('/:id', verifyToken, UPDATE_ORDER);
router.delete('/', verifyToken, DELETE_ALL_ORDERS);
router.delete('/:orderId', verifyToken, DELETE_ORDER);

export default router;
