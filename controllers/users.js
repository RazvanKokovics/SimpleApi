import { ValidationError, UniqueConstraintError } from 'sequelize';

import { extractErrors, InexistentItem } from '../validators/errors';
import userService from '../service/users';

class UserController {
  constructor(userService) {
    this._userService = userService;

    this.getUsers = this.getUsers.bind(this);
    this.addUser = this.addUser.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
    this.updateUser = this.updateUser.bind(this);
  }

  async getUsers(request, response) {
    try {
      const users = await this._userService.fetchUsers();

      return response.status(200).send(users);
    } catch (error) {
      return response.status(400).send('An error occured.');
    }
  }

  async addUser(request, response) {
    try {
      const user = await this._userService.insertUser(request.body);

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

      await this._userService.removeUser(userName);

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
      const user = await this._userService.changeUser(request.body);

      return response.status(200).json({
        status: 'Success',
        message: 'User data updated.',
        user,
      });
    } catch (error) {
      if (error instanceof ValidationError) {
        return response.status(422).json({
          status: 'Failure.',
          message: extractErrors(error),
        });
      } else if (error instanceof InexistentItem) {
        return response.status(error.code).json({
          status: 'Failure.',
          message: error.message,
        });
      }
      return response.status(400).send('An error occured.');
    }
  }
}

export default new UserController(userService);
