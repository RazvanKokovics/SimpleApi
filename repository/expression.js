import { Expression, User, UserExpression } from '../models';

class ExpressionRepository {
  constructor(expression, user, userExpression) {
    this._expression = expression;
    this._user = user;
    this._userExpression = userExpression;
  }

  getExpressionByValue(value) {
    return this._expression.findOne({
      where: {
        value,
      },
    });
  }

  addExpression(value) {
    return this._expression.create({ value });
  }

  addExpressionToUser(userId, expressionId) {
    return this._userExpression.create({
      userId,
      expressionId,
    });
  }

  getExpressionsByUser(userId) {
    return this._user.findByPk(userId, {
      attributes: [],
      include: [
        {
          model: this._expression,
          as: 'Expressions',
          required: false,
          attributes: ['id', 'value'],
          through: {
            model: this._userExpression,
            attributes: [],
          },
        },
      ],
    });
  }

  deleteExpression(id) {
    return this._expression.destroy({
      where: {
        id,
      },
    });
  }

  deleteExpressionFromUsers(expressionId) {
    return this._userExpression.destroy({
      where: {
        expressionId,
      },
    });
  }
}

export default new ExpressionRepository(Expression, User, UserExpression);
