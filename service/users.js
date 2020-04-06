import bcrypt from 'bcryptjs';

import { InexistentItem } from '../validators/errors';
import { addUser, deleteUser, getUsers, updateUser } from '../repository/users';

export const fetchUsers = () => {
  return getUsers();
};

export const insertUser = async (user) => {
  const { password } = user;

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  const userWithHashedPassword = { ...user, password: hashPassword };

  return await addUser(userWithHashedPassword);
};

export const removeUser = (userName) => {
  deleteUser(userName);
};

export const changeUser = async (user) => {
  const updated = await updateUser(user);

  if (!updated[0]) {
    throw new InexistentItem('Username does not exists.');
  }
};
