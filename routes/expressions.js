import express from 'express';

import verifyToken from '../validators/token';

import expressionController from '../controllers/expression';
import e from 'express';

const router = express.Router();

router.post('/', verifyToken, (req, res, next) =>
  expressionController.addExpression(req, res, next),
);
router.get('/', verifyToken, (req, res, next) =>
  expressionController.getExpressions(req, res, next),
);
router.delete('/', verifyToken, (req, res, next) =>
  expressionController.deleteExpression(req, res, next),
);

export default router;
