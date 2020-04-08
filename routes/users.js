import express from 'express';

import userController from '../controllers/users';

const router = express.Router();

router.get('/', userController.getUsers);
router.post('/register', userController.addUser);
router.delete('/delete', userController.deleteUser);
router.put('/update', userController.updateUser);

export default router;
