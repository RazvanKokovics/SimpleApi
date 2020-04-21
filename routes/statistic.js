import express from 'express';

import statisticController from '../controllers/statistic';

const router = express.Router();

router.get('/users/roles', (req, res, next) =>
  statisticController.getUserRoleStatistic(req, res, next),
);

router.get('/users/expressions', (req, res, next) =>
  statisticController.getUserExpressionsStatisticByUser(req, res, next),
);

router.get('/expressions/users', (req, res, next) =>
  statisticController.getUserExpressionsStatisticByExpression(req, res, next),
);

router.get('/equations', (req, res, next) =>
  statisticController.getEquationSolutionStatistic(req, res, next),
);

export default router;
