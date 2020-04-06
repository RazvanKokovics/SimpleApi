import { ValidationError, UniqueConstraintError } from 'sequelize';

import {
  fetchUsers,
  insertUser,
  removeUser,
  changeUser,
} from '../service/users';
import { extractErrors, InexistentItem } from '../validators/errors';

export const getUsers = (response) => {
  try {
    const users = fetchUsers();

    return response.status(200).send(users);
  } catch (error) {
    return response.status(400).send('An error occured.');
  }
};

export const addUser = (request, response) => {
  try {
    insertUser(request.body);

    return response.status(201).json({
      status: 'Success.',
      message: 'User added.',
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
};

export const deleteUser = (request, response) => {
  try {
    const { userName } = request.body;

    removeUser(userName);

    return response.status(200).json({
      status: 'Success',
      message: 'User deleted.',
    });
  } catch (error) {
    return response.status(400).send('An error occured.');
  }
};

export const updateUser = async (request, response) => {
  try {
    changeUser(request.body);

    return response.status(200).json({
      status: 'Success',
      message: 'User data updated.',
    });
  } catch (error) {
    if (error instanceof InexistentItem) {
      return response.status(404).json({
        status: 'Failure.',
        message: error.message,
      });
    }
    return response.status(400).send('An error occured.');
  }
};
