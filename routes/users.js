import express from 'express';

import { addUserValidationRules, validateData } from '../validators/data';
import {
  getUsers,
  addUser,
  deleteUser,
  updateUser,
} from '../controllers/users';

const router = express.Router();

router.get('/', getUsers);
router.post('/register', addUserValidationRules(), validateData, addUser);
router.delete('/delete', deleteUser);
router.put('/update', updateUser);

export default router;
