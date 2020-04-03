import express from 'express';
import bcrypt from 'bcryptjs';

import { addUserValidationRules, validateData } from '../validate.js';
import { User } from '../models';

const router = express.Router();

const getUsers = async (request, response) => {
  try {
    const users = await User.findAll();
    return response.status(200).send(users);
  } catch (error) {
    return response.status(400).send('An error occured.');
  }
};

const addUser = async (request, response) => {
  const { userName, email, firstName, lastName, password } = request.body;

  try {
    const foundUser = await User.findAll({
      where: {
        userName,
      },
    });

    if (foundUser.length !== 0) {
      return response.status(302).json({
        status: 'Failure.',
        message: 'User already exists.',
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    await User.create({
      firstName,
      lastName,
      email,
      password: hashPassword,
      userName,
    });

    return response.status(201).json({
      status: 'Success',
      message: 'User added.',
    });
  } catch (error) {
    return response.status(400).send('An error occured.');
  }
};

const deleteUser = async (request, response) => {
  const { userName } = request.body;

  try {
    await User.destroy({
      where: {
        userName,
      },
    });
    return response.status(201).json({
      status: 'Success',
      message: 'User deleted.',
    });
  } catch (error) {
    return response.status(400).send('An error occured.');
  }
};

const updateUser = async (request, response) => {
  const { userName, email, firstName, lastName } = request.body;

  const foundUser = await User.findAll({
    where: {
      userName,
    },
  });

  if (foundUser.length === 0) {
    return response.status(302).json({
      status: 'Failure.',
      message: 'User does not exists.',
    });
  }

  try {
    await User.update(
      { email, firstName, lastName },
      {
        where: {
          userName,
        },
      },
    );
    return response.status(201).json({
      status: 'Success',
      message: 'User data updated.',
    });
  } catch (error) {
    return response.status(400).send('An error occured.');
  }
};

router.get('/', getUsers);
router.post('/register', addUserValidationRules(), validateData, addUser);
router.delete('/delete', deleteUser);
router.put('/update', updateUser);

module.exports = router;
