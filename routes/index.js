import express from 'express';

import usersRoute from './users';
import expressionsRoute from './expressions';
import authRoute from './login';

const router = express.Router();

router.use('/user', usersRoute);
router.use('/expressions', expressionsRoute);
router.use('/login', authRoute);

export default router;
