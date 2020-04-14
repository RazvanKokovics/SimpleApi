import { Expression, User, UserExpression } from '../models';

class ExpressionRepository {
  getAllExpressions() {
    return Expression.findAll({
      attributes: ['id', 'value'],
      include: [
        {
          model: User,
          required: false,
          attributes: ['userName'],
          through: {
            model: UserExpression,
            attributes: [],
          },
        },
      ],
    });
  }

  getExpressionByValue(value) {
    return Expression.findOne({
      where: {
        value,
      },
    });
  }

  addExpression(value) {
    return Expression.create({ value });
  }

  addExpressionToUser(userId, expressionId) {
    return UserExpression.create({
      userId,
      expressionId,
    });
  }

  deleteExpression(id) {
    return Expression.destroy({
      where: {
        id,
      },
    });
  }

  deleteExpressionFromUser(expressionId, userId) {
    return UserExpression.destroy({
      where: {
        expressionId,
        userId,
      },
    });
  }

  deleteUserFromExpression(userId) {
    return UserExpression.destroy({
      where: {
        userId,
      },
    });
  }

  getUserExpressions(userId) {
    return Expression.findAll({
      include: [
        {
          model: User,
          where: { id: userId },
          attributes: [],
          through: {
            model: UserExpression,
            attributes: [],
          },
        },
      ],
    });
  }
}

export default new ExpressionRepository();
