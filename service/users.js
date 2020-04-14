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

  async removeUser(userId) {
    const user = await userRepository.getUserById(userId);

    if (!user) {
      throw new InexistentItem('UserId does not exists.');
    }

    await userRepository.deleteUser(userId);
    await expressionRepository.deleteUserFromExpression(userId);
  }

  async changeUser(user, userId) {
    const { password } = user;

    const data = password
      ? { ...user, password: await hashPassword(password), userId }
      : { ...user, userId };

    const updated = await userRepository.updateUser(data);

    if (!updated[0]) {
      throw new InexistentItem('Username does not exists.');
    }

    return updated[1][0];
  }
}

export default new UserService();
