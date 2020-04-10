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

  deleteExpressionFromUsers(expressionId) {
    return UserExpression.destroy({
      where: {
        expressionId,
      },
    });
  }
}

export default new ExpressionRepository();
