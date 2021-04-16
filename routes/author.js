import { Router } from 'express';
import { CREATE_NEW_AUTHOR, DELETE_ALL_AUTHORS, GET_LIST_AUTHORS } from '../controllers/author';
const router = Router();


router.get('/', GET_LIST_AUTHORS);
router.post('/',CREATE_NEW_AUTHOR)
router.delete('/',DELETE_ALL_AUTHORS)

export default router;

