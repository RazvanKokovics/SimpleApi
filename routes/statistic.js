import express from 'express';

import statisticController from '../controllers/statistic';

const router = express.Router();

router.get('/users', (req, res, next) =>
  statisticController.getUserStatistic(req, res, next),
);

export default router;
