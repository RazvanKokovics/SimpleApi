import express from 'express';

import verifyToken from '../middlewares/tokenMiddleware';
import {
  addExpression,
  getExpressions,
  deleteExpression,
} from '../controllers/expression';

const router = express.Router();

router.post('/', verifyToken, addExpression);
router.get('/', verifyToken, getExpressions);
router.delete('/', verifyToken, deleteExpression);

export default router;
