import { Router } from 'express';
import { CREATE_NEW_CATEGORY,GET_LIST_CATEGORIES,DELETE_ALL_CATEGORIES} from '../controllers/category';
const router = Router();


router.get('/', GET_LIST_CATEGORIES);
router.post('/',CREATE_NEW_CATEGORY)
router.delete('/',DELETE_ALL_CATEGORIES)

export default router;

