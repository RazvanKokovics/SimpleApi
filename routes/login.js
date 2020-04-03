import express from 'express';

import { loginValidationRules, validateData } from '../validators/data';
import { login } from '../controllers/login';

const router = express.Router();

router.post('/login', loginValidationRules(), validateData, login);

export default router;
