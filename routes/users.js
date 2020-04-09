import express from 'express';

import userController from '../controllers/users';

const router = express.Router();

router.get('/', (req, res, next) => userController.getUsers(req, res, next));
router.post('/register', (req, res, next) =>
  userController.addUser(req, res, next),
);
router.delete('/delete', (req, res, next) =>
  userController.deleteUser(req, res, next),
);
router.put('/update', (req, res, next) =>
  userController.updateUser(req, res, next),
);

export default router;
