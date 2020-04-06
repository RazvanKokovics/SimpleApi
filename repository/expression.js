import { User, Expression, UserExpression } from '../models';

export const getExpressionByValue = async (value) => {
  return await Expression.findOne({
    where: {
      value,
    },
  });
};

export const addExpression = async (value) => {
  return await Expression.create({ value });
};

export const addExpressionToUser = async (userId, expressionId) => {
  UserExpression.create({
    userId,
    expressionId,
  });
};

export const getExpressionsByUser = async (userId) => {
  return await User.findByPk(userId, {
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
};

export const deleteExpression = async (id) => {
  return await Expression.destroy({
    where: {
      id,
    },
  });
};

export const deleteExpressionFromUsers = async (expressionId) => {
  return await UserExpression.destroy({
    where: {
      expressionId,
    },
  });
};
