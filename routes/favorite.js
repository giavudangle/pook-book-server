import { Router } from 'express';
import {  DELETE_FAVORITE_ITEM, GET_FAVORITES, POST_FAVORITE } from '../controllers/favorite';
import verifyToken from '../middlewares/verifyToken';

const router = Router();

router.get('/', verifyToken, GET_FAVORITES);

router.post('/', verifyToken, POST_FAVORITE);

router.patch('/:userId', verifyToken, DELETE_FAVORITE_ITEM);

export default router;
