import express from 'express';

import verifyToken from '../middlewares/tokenMiddleware';
import adminMiddleware from '../middlewares/adminMiddleware';

import equationController from '../controllers/equation';

const router = express.Router();

router.post('/', verifyToken, adminMiddleware, (req, res, next) =>
  equationController.addEquation(req, res, next),
);
router.get('/', (req, res, next) =>
  equationController.getRandomEquation(req, res, next),
);
router.delete('/:equationId', verifyToken, adminMiddleware, (req, res, next) =>
  equationController.deleteEquation(req, res, next),
);
router.put('/:equationId', verifyToken, adminMiddleware, (req, res, next) =>
  equationController.updateEquation(req, res, next),
);
router.get('/all', verifyToken, adminMiddleware, (req, res, next) =>
  equationController.getAllEquations(req, res, next),
);
router.post('/solution', (req, res, next) =>
  equationController.checkSolution(req, res, next),
);

export default router;
