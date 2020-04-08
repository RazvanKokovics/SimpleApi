import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { WrongCredential } from '../validators/errors';
import userRepository from '../repository/users';

class LoginService {
  constructor(userRepository) {
    this._userRepository = userRepository;

    this.userLogin = this.userLogin.bind(this);
  }

  async userLogin(userName, password) {
    const user = await this._userRepository.getUserByUserName(userName);

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
  }
}

export default new LoginService(userRepository);
