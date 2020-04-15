import express from 'express';

import usersRoute from './users';
import expressionsRoute from './expressions';
import authRoute from './login';
import equationsRoute from './equations';

const router = express.Router();

router.use('/user', usersRoute);
router.use('/expressions', expressionsRoute);
router.use('/login', authRoute);
router.use('/equations', equationsRoute);

export default router;
