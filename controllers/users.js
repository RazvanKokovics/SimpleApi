import { ValidationError, UniqueConstraintError } from 'sequelize';

import { extractErrors, InexistentItem } from '../validators/errors';
import userService from '../service/users';

class UserController {
  async getUsers(request, response) {
    try {
      const users = await userService.fetchUsers();

      return response.status(200).send(users);
    } catch (error) {
      return response.status(400).send('An error occured.');
    }
  }

  async addUser(request, response) {
    try {
      const user = await userService.insertUser(request.body);

      return response.status(201).json({
        status: 'Success.',
        message: 'User added.',
        user,
      });
    } catch (error) {
      if (error instanceof ValidationError) {
        return response.status(422).json({
          status: 'Failure.',
          message: extractErrors(error),
        });
      } else if (error instanceof UniqueConstraintError) {
        return response.status(403).json({
          status: 'Failure.',
          message: error.message,
        });
      }

      return response.status(400).send('An error occured.');
    }
  }

  async deleteUser(request, response) {
    try {
      const { userName } = request.body;

      await userService.removeUser(userName);

      return response.status(200).json({
        status: 'Success',
        message: 'User deleted.',
      });
    } catch (error) {
      return response.status(400).send('An error occured.');
    }
  }

  async updateUser(request, response) {
    try {
      const user = await userService.changeUser(request.body);

      return response.status(200).json({
        status: 'Success',
        message: 'User data updated.',
        user,
      });
    } catch (error) {
      if (error instanceof InexistentItem) {
        return response.status(error.code).json({
          status: 'Failure.',
          message: error.message,
        });
      }

      return response.status(400).send('An error occured.');
    }
  }
}

export default new UserController();
