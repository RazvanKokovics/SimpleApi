import express from 'express';

import userController from '../controllers/users';
import verifyToken from '../middlewares/tokenMiddleware';
import adminMiddleware from '../middlewares/adminMiddleware';
import sameIdMiddleware from '../middlewares/sameIdMiddleware';

const router = express.Router();

router.get('/', verifyToken, adminMiddleware, (req, res, next) =>
  userController.getUsers(req, res, next),
);
router.post('/register', (req, res, next) =>
  userController.addUser(req, res, next),
);
router.delete('/delete/:id', verifyToken, adminMiddleware, (req, res, next) =>
  userController.deleteUser(req, res, next),
);
router.put('/update/:id', verifyToken, adminMiddleware, (req, res, next) =>
  userController.updateUser(req, res, next),
);
//for regular users
router.delete(
  '/delete/account/:id',
  verifyToken,
  sameIdMiddleware,
  (req, res, next) => userController.deleteHimself(req, res, next),
);
router.put(
  '/update/account/:id',
  verifyToken,
  sameIdMiddleware,
  (req, res, next) => userController.updateHimself(req, res, next),
);

export default router;
