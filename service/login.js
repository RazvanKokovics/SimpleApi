import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { WrongCredential } from '../validators/errors';
import { getUserByUserName } from '../repository/login';

export const userLogin = async (userName, password) => {
  const user = await getUserByUserName(userName);

  if (!user) {
    throw new WrongCredential('Username does not exist.');
  }

  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword) {
    throw new WrongCredential('Password is incorrect.');
  }

  return jwt.sign(
    { userName: user.userName, userId: user.id },
    process.env.TOKEN_SECRET,
  );
};
