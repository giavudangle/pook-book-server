import { Router } from 'express';
import { GET_LIST_PUBLISHERS,CREATE_NEW_PUBLISHER,DELETE_ALL_PUBLISHERS} from '../controllers/publisher';
const router = Router();


router.get('/', GET_LIST_PUBLISHERS);
router.post('/',CREATE_NEW_PUBLISHER)
router.delete('/',DELETE_ALL_PUBLISHERS)

export default router;

