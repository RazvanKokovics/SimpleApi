import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { WrongCredential, UnexpectedError } from '../validators/errors';
import userRepository from '../repository/users';

class LoginService {
  async userLogin(userName, password) {
    try {
      const user = await userRepository.getUserByUserName(userName);

      if (!user) {
        throw new WrongCredential('Username does not exist.');
      }

      const validPassword = await bcrypt.compare(password, user.password);

      if (!validPassword) {
        throw new WrongCredential('Password is incorrect.');
      }

      return jwt.sign(
        { userName: user.userName, userId: user.id, role: user.role },
        process.env.TOKEN_SECRET,
      );
    } catch (error) {
      if (error instanceof WrongCredential) {
        throw error;
      }

      throw new UnexpectedError();
    }
  }
}

export default new LoginService();
