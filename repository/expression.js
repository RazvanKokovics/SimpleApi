import { Expression, User, UserExpression } from '../models';

class ExpressionRepository {
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

  getExpressionsByUser(userId) {
    return User.findByPk(userId, {
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
  }

  deleteExpression(id) {
    return Expression.destroy({
      where: {
        id,
      },
    });
  }

  deleteExpressionFromUsers(expressionId) {
    return UserExpression.destroy({
      where: {
        expressionId,
      },
    });
  }
}

export default new ExpressionRepository();
