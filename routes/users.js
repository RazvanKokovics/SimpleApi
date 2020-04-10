import express from 'express';

import userController from '../controllers/users';
import verifyToken from '../middlewares/tokenMiddleware';
import adminMiddleware from '../middlewares/adminMiddleware';

const router = express.Router();

router.get('/', verifyToken, adminMiddleware, (req, res, next) =>
  userController.getUsers(req, res, next),
);
router.post('/register', (req, res, next) =>
  userController.addUser(req, res, next),
);
router.delete('/delete', verifyToken, adminMiddleware, (req, res, next) =>
  userController.deleteUser(req, res, next),
);
router.put('/update', verifyToken, adminMiddleware, (req, res, next) =>
  userController.updateUser(req, res, next),
);
//for regular users
router.delete('/delete/account', verifyToken, (req, res, next) =>
  userController.deleteHimself(req, res, next),
);
router.put('/update/account', verifyToken, (req, res, next) =>
  userController.updateHimself(req, res, next),
);

export default router;
