import { Router } from 'express';
import {GET_LIST_STATUS,CREATE_NEW_STATUS,DELETE_ALL_STATUS} from '../controllers/status'
const router = Router();


router.get('/', GET_LIST_STATUS);
router.post('/',CREATE_NEW_STATUS)
router.delete('/',DELETE_ALL_STATUS)

export default router;

