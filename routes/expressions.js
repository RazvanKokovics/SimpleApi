import express, { request, response } from 'express';
import verifyToken from './verifyToken';
import { User, Expression, UserExpression } from '../models';

const router = express.Router();

const addExpression = async (request, response) => {
  try {
    const { value } = request.body;
    const { userId } = request.user;

    const expressionFound = await Expression.findOne({
      where: {
        value,
      },
    });

    const { id } = expressionFound
      ? expressionFound
      : await Expression.create({ value });

    await UserExpression.create({
      userId,
      expressionId: id,
    });

    return response.status(200).json({
      status: 'Success',
      message: 'Expression added to user.',
    });
  } catch (error) {
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
          attributes: ['id', 'value'],
          through: {
            model: UserExpression,
            attributes: [],
          },
        },
      ],
    });

    return response.status(200).json(expressions.Expressions);
  } catch (error) {
    return response.status(400).send('An error occured.');
  }
};

const deleteExpression = async (request, response) => {
  try {
    const { expressionId } = request.body;

    await Expression.destroy({
      where: {
        id: expressionId,
      },
    });

    await UserExpression.destroy({
      where: {
        expressionId,
      },
    });

    return response.status(200).json({
      status: 'Success',
      message: 'Expression deleted.',
    });
  } catch (error) {
    return response.status(400).send('An error occured.');
  }
};

router.post('/', verifyToken, addExpression);
router.get('/', verifyToken, getExpressions);
router.delete('/', verifyToken, deleteExpression);

export default router;
