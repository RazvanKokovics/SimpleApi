import { ValidationError, UniqueConstraintError } from 'sequelize';

import {
  InexistentItem,
  CustomUniqueConstraintError,
  CustomValidationError,
  UnexpectedError,
} from '../validators/errors';
import userRepository from '../repository/users';
import expressionRepository from '../repository/expression';
import { hashPassword } from '../utils';

class UserService {
  async fetchUsers() {
    try {
      return await userRepository.getUsers();
    } catch (error) {
      throw new UnexpectedError();
    }
  }

  async insertUser(user) {
    try {
      const { password } = user;

      const newPassword = await hashPassword(password);

      const updatedUserData = {
        ...user,
        password: newPassword,
        role: 2,
      };

      return await userRepository.addUser(updatedUserData);
    } catch (error) {
      if (error instanceof ValidationError) {
        throw new CustomValidationError(error);
      } else if (error instanceof UniqueConstraintError) {
        throw new CustomUniqueConstraintError(error.message);
      }

      throw new UnexpectedError();
    }
  }

  async removeUser(userName) {
    try {
      const user = await userRepository.getUserByUserName(userName);

      if (!user) {
        throw new InexistentItem(
          'The user with this username does not exists.',
        );
      }

      await userRepository.deleteUser(userName);
      await expressionRepository.deleteUserFromExpression(user.id);
    } catch (error) {
      if (error instanceof InexistentItem) {
        throw error;
      }

      throw new UnexpectedError();
    }
  }

  async changeUser(user, userName) {
    try {
      const { password } = user;

      const data = password
        ? { ...user, password: await hashPassword(password), userName }
        : { ...user, userName };

      const updated = await userRepository.updateUser(data);

      if (!updated[0]) {
        throw new InexistentItem(
          'The user with this username does not exists.',
        );
      }

      return updated[1][0];
    } catch (error) {
      if (error instanceof InexistentItem) {
        throw error;
      } else if (error instanceof ValidationError) {
        throw new CustomValidationError(error);
      } else if (error instanceof UniqueConstraintError) {
        throw new CustomUniqueConstraintError(error.message);
      }

      throw new UnexpectedError();
    }
  }
}

export default new UserService();
