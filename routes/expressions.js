import express from 'express';

import verifyToken from '../middlewares/tokenMiddleware';
import adminMiddleware from '../middlewares/adminMiddleware';

import expressionController from '../controllers/expression';

const router = express.Router();

router.post('/', verifyToken, (req, res, next) =>
  expressionController.addExpression(req, res, next),
);
router.get('/', verifyToken, (req, res, next) =>
  expressionController.getExpressions(req, res, next),
);
router.delete('/:expressionId', verifyToken, (req, res, next) =>
  expressionController.deleteExpressionFromUser(req, res, next),
);
router.delete(
  '/delete/:expressionId',
  verifyToken,
  adminMiddleware,
  (req, res, next) => expressionController.deleteExpression(req, res, next),
);

export default router;
