import { InexistentItem } from '../validators/errors';
import userRepository from '../repository/users';
import expressionRepository from '../repository/expression';
import { hashPassword } from '../utils';

class UserService {
  fetchUsers() {
    return userRepository.getUsers();
  }

  async insertUser(user) {
    const { password } = user;

    const newPassword = await hashPassword(password);

    const updatedUserData = {
      ...user,
      password: newPassword,
      role: 2,
    };

    return userRepository.addUser(updatedUserData);
  }

  async removeUser(userName) {
    const user = await userRepository.getUserByUserName(userName);

    if (!user) {
      throw new InexistentItem('Username does not exists.');
    }

    userRepository.deleteUser(userName);
    expressionRepository.deleteUserFromExpression(user.id);
  }

  async changeUser(user, userName) {
    const { password } = user;

    const data = password
      ? { ...user, password: await hashPassword(password), userName }
      : { ...user, userName };

    const updated = await userRepository.updateUser(data);

    if (!updated[0]) {
      throw new InexistentItem('Username does not exists.');
    }

    return updated[1][0];
  }
}

export default new UserService();
