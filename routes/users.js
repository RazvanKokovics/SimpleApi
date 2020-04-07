import express from 'express';

import {
  getUsers,
  addUser,
  deleteUser,
  updateUser,
} from '../controllers/users';
import adminMiddleware from '../middlewares/adminMiddleware';
import verifyToken from '../middlewares/tokenMiddleware';

const router = express.Router();

router.get('/', verifyToken, adminMiddleware, getUsers);
router.post('/register', verifyToken, adminMiddleware, addUser);
router.delete('/delete', verifyToken, adminMiddleware, deleteUser);
router.put('/update', verifyToken, adminMiddleware, updateUser);

export default router;
