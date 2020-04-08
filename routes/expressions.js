import express from 'express';

import verifyToken from '../validators/token';

import expressionController from '../controllers/expression';

const router = express.Router();

router.post('/', verifyToken, expressionController.addExpression);
router.get('/', verifyToken, expressionController.getExpressions);
router.delete('/', verifyToken, expressionController.deleteExpression);

export default router;
