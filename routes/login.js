import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import express from 'express';

import { loginValidationRules, validateData } from '../validate.js';
import { User } from '../models';

const router = express.Router();

const login = async (request, response) => {
  const { userName, password } = request.body;

  try {
    const foundUser = await User.findAll({
      where: {
        userName,
      },
    });

    if (foundUser.length === 0) {
      return response.status(302).json({
        status: 'Failure.',
        message: 'UserName is invalid.',
      });
    }

    const user = foundUser[0];
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return response.status(401).send('Invalid password!');
    }

    const token = jwt.sign(
      { userName: user.userName, userId: user.id },
      process.env.TOKEN_SECRET,
    );

    return response.header('auth-token', token).send(token);
  } catch (error) {
    return response.status(400).send('An error occured.');
  }
};

router.post('/login', loginValidationRules(), validateData, login);

export default router;
