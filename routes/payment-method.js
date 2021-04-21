import { Router } from 'express';
import {GET_LIST_PAYMENT_METHODS,CREATE_NEW_PAYMENT_METHOD,DELETE_ALL_PAYMENT_METHODS} from '../controllers/payment-method'
const router = Router();


router.get('/', GET_LIST_PAYMENT_METHODS);
router.post('/',CREATE_NEW_PAYMENT_METHOD)
router.delete('/',DELETE_ALL_PAYMENT_METHODS)

export default router;

