import bcrypt from 'bcryptjs';

import { InexistentItem } from '../validators/errors';
import userRepository from '../repository/users';

class UserService {
  constructor(userRepository) {
    this._userRepository = userRepository;
  }

  fetchUsers() {
    return this._userRepository.getUsers();
  }

  async insertUser(user) {
    const { password } = user;

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const userWithHashedPassword = { ...user, password: hashPassword };

    return this._userRepository.addUser(userWithHashedPassword);
  }

  removeUser(userName) {
    this._userRepository.deleteUser(userName);
  }

  async changeUser(user) {
    const updated = await this._userRepository.updateUser(user);

    if (!updated[0]) {
      throw new InexistentItem('Username does not exists.');
    }
    return updated[1][0];
  }
}

export default new UserService(userRepository);
