import express from 'express';

import userController from '../controllers/users';
import verifyToken from '../middlewares/tokenMiddleware';
import adminMiddleware from '../middlewares/adminMiddleware';

const router = express.Router();

router.get('/', verifyToken, adminMiddleware, userController.getUsers);
router.post('/register', verifyToken, adminMiddleware, userController.addUser);
router.delete(
  '/delete',
  verifyToken,
  adminMiddleware,
  userController.deleteUser,
);
router.put('/update', verifyToken, adminMiddleware, userController.updateUser);

export default router;
