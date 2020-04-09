import express from 'express';

import loginController from '../controllers/login';

const router = express.Router();

router.post('/', (req, res, next) => loginController.login(req, res, next));

export default router;
