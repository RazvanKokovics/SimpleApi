import { User, Expression, UserExpression } from '../models';

export const insertExpression = async (userId, value) => {
  try {
    const expressionFound = await Expression.findOne({
      where: {
        value,
      },
    });

    const { id } = expressionFound
      ? expressionFound
      : await Expression.create({ value });

    return await UserExpression.create({
      userId,
      expressionId: id,
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

export const fetchExpressions = async (userId) => {
  try {
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

    return expressions.Expressions;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const removeExpression = async (expressionId) => {
  try {
    await Expression.destroy({
      where: {
        id: expressionId,
      },
    });

    return await UserExpression.destroy({
      where: {
        expressionId,
      },
    });
  } catch (error) {
    throw new Error(error.message);
  }
};
