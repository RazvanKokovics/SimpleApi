import userService from '../service/users';

class UserController {
  async getUsers(request, response) {
    try {
      const users = await userService.fetchUsers();

      return response.status(200).send(users);
    } catch (error) {
      return response.status(error.code).send(error.message);
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
      return response.status(error.code).send(error.message);
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
      return response.status(error.code).send(error.message);
    }
  }

  async updateUser(request, response) {
    try {
      const { userName } = request.body;

      const user = await userService.changeUser(request.body, userName);

      return response.status(200).json({
        status: 'Success',
        message: 'User data updated.',
        user,
      });
    } catch (error) {
      return response.status(error.code).send(error.message);
    }
  }

  async deleteHimself(request, response) {
    try {
      const { userName } = request.user;

      await userService.removeUser(userName);

      return response.status(200).json({
        status: 'Success',
        message: 'User deleted.',
      });
    } catch (error) {
      return response.status(error.code).send(error.message);
    }
  }

  async updateHimself(request, response) {
    try {
      const { userName } = request.user;

      const user = await userService.changeUser(
        { ...request.body, role: 2 },
        userName,
      );

      return response.status(200).json({
        status: 'Success',
        message: 'User data updated.',
        user,
      });
    } catch (error) {
      return response.status(error.code).send(error.message);
    }
  }
}

export default new UserController();
