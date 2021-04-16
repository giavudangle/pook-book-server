import { Router } from 'express';
import { GET_LIST_PROVIDERS,CREATE_NEW_PROVIDER,DELETE_ALL_PROVIDERS } from '../controllers/provider';
const router = Router();


router.get('/', GET_LIST_PROVIDERS);
router.post('/',CREATE_NEW_PROVIDER)
router.delete('/',DELETE_ALL_PROVIDERS)

export default router;

