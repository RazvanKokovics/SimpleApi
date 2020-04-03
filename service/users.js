import bcrypt from 'bcryptjs';

import { User } from '../models';

export const fetchUsers = async () => {
  try {
    return await User.findAll();
  } catch (error) {
    throw new Error(error.message);
  }
};

export const insertUser = async (user) => {
  const { userName, email, firstName, lastName, password } = user;

  try {
    const foundUser = await User.findOne({
      where: {
        userName,
      },
    });

    if (foundUser) {
      /*
      return response.status(403).json({
        status: 'Failure.',
        message: 'User already exists.',
      });
      */
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

    return;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const removeUser = async (userName) => {
  try {
    await User.destroy({
      where: {
        userName,
      },
    });

    return;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const changeUser = async (user) => {
  const { userName, email, firstName, lastName } = user;

  const foundUser = await User.findOne({
    where: {
      userName,
    },
  });

  if (!foundUser) {
    /*return response.status(422).json({
      status: 'Failure.',
      message: 'User does not exists.',
    });*/
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

    return;
  } catch (error) {
    throw new Error(error.message);
  }
};
