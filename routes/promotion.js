import { Router } from 'express';
import { CREATE_NEW_PROMOTION,GET_LIST_PROMOTIONS} from '../controllers/promotion';
const router = Router();


router.get('/', GET_LIST_PROMOTIONS);
router.post('/',CREATE_NEW_PROMOTION)

export default router;

