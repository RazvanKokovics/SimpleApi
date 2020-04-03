import express from 'express';
import verifyToken from './verifyToken';
import { User, Expression, UserExpression } from '../models';

const router = express.Router();

const addExpression = async (request, response) => {
  const { value } = request.body;
  const { userId } = request.user;

  try {
    const expressionFound = await Expression.findAll({
      where: {
        value,
      },
    });

    let expressionId;
    if (expressionFound.length === 0) {
      const expression = await Expression.create({ value });
      expressionId = expression.id;
    } else {
      expressionId = expressionFound[0].id;
    }

    await UserExpression.create({
      userId,
      expressionId,
    });

    return response.status(201).json({
      status: 'Success',
      message: 'Expression added to user.',
    });
  } catch (error) {
    console.log(error);
    return response.status(400).send('An error occured.');
  }
};

const getExpressions = async (request, response) => {
  try {
    const { userId } = request.user;

    const expressions = await User.findByPk(userId, {
      attributes: [],
      include: [
        {
          model: Expression,
          as: 'Expressions',
          required: false,
          attributes: ['value'],
          through: {
            model: UserExpression,
            attributes: [],
          },
        },
      ],
    });
    return response.status(200).json(expressions);
  } catch (error) {
    console.log(error);
    return response.status(400).send('An error occured.');
  }
};

router.post('/', verifyToken, addExpression);
router.get('/', verifyToken, getExpressions);

export default router;
