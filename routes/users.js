import express from 'express';
import bcrypt from 'bcryptjs';

import { addUserValidationRules, validateData } from '../validate.js';
import { User } from '../models';

const router = express.Router();

const getUsers = async (request, response) => {
  try {
    const users = await User.findAll();
    response.status(200).send(users);
  } catch (error) {
    console.log(error);
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

    if (foundUser) {
      response.status(302).json({
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

    response.status(201).json({
      status: 'Success',
      message: 'User added.',
    });
  } catch (error) {
    console.log(error);
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
    response.status(201).json({
      status: 'Success',
      message: 'User deleted.',
    });
  } catch (error) {
    console.log(error);
  }
};

const updateUser = async (request, response) => {
  const { userName, email, firstName, lastName } = request.body;

  const foundUser = await User.findAll({
    where: {
      userName,
    },
  });

  if (foundUser) {
    response.status(302).json({
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
    response.status(201).json({
      status: 'Success',
      message: 'User data updated.',
    });
  } catch (error) {
    console.log(error);
  }
};

router.get('/', getUsers);
router.post('/register', addUserValidationRules(), validateData, addUser);
router.delete('/delete', deleteUser);
router.put('/update', updateUser);

module.exports = router;
