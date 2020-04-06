import express from 'express';

import {
  getUsers,
  addUser,
  deleteUser,
  updateUser,
} from '../controllers/users';

const router = express.Router();

router.get('/', getUsers);
router.post('/register', addUser);
router.delete('/delete', deleteUser);
router.put('/update', updateUser);

export default router;
