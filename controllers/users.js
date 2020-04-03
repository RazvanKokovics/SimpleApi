import bcrypt from 'bcryptjs';

import {
  fetchUsers,
  insertUser,
  removeUser,
  changeUser,
} from '../service/users';

export const getUsers = async (request, response) => {
  try {
    const users = await fetchUsers();

    return response.status(200).send(users);
  } catch (error) {
    return response.status(400).send('An error occured.');
  }
};

export const addUser = async (request, response) => {
  try {
    await insertUser(request.body);

    return response.status(201).json({
      status: 'Success',
      message: 'User added.',
    });
  } catch (error) {
    return response.status(400).send('An error occured.');
  }
};

export const deleteUser = async (request, response) => {
  try {
    const { userName } = request.body;

    await removeUser(userName);

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
    await changeUser(request.body);

    return response.status(200).json({
      status: 'Success',
      message: 'User data updated.',
    });
  } catch (error) {
    return response.status(400).send('An error occured.');
  }
};
