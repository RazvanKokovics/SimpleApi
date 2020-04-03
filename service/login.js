import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { User } from '../models';

export const userLogin = async (userName, password) => {
  try {
    const user = await User.findOne({
      where: {
        userName,
      },
    });

    if (!user) {
      /*
      return response.status(422).json({
        status: 'Failure.',
        message: 'Username is invalid.',
      });
      */
      //throw error??
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      //return response.status(401).send('Invalid password!');
    }

    return jwt.sign(
      { userName: user.userName, userId: user.id },
      process.env.TOKEN_SECRET,
    );
  } catch (error) {
    throw new Error(error.message);
  }
};
