import { Router } from 'express';
import { CREATE_NEW_REVIEW, GET_LIST_REVIEWS_BY_PRODUCT, GET_LIST_REVIEWS } from '../controllers/review';
const router = Router();


router.get('/:productID', GET_LIST_REVIEWS_BY_PRODUCT);
router.get('/', GET_LIST_REVIEWS);
router.post('/',CREATE_NEW_REVIEW)

export default router;

