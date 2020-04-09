import bcrypt from 'bcryptjs';

import { InexistentItem } from '../validators/errors';
import userRepository from '../repository/users';

class UserService {
  fetchUsers() {
    return userRepository.getUsers();
  }

  async insertUser(user) {
    const { password } = user;

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const userWithHashedPassword = { ...user, password: hashPassword };

    return userRepository.addUser(userWithHashedPassword);
  }

  removeUser(userName) {
    userRepository.deleteUser(userName);
  }

  async changeUser(user) {
    const updated = await userRepository.updateUser(user);

    if (!updated[0]) {
      throw new InexistentItem('Username does not exists.');
    }
    return updated[1][0];
  }
}

export default new UserService();
