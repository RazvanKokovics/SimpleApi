import expressionRepository from '../repository/expression';

class ExpressionService {
  async insertExpression(userId, value) {
    const expressionFound = await expressionRepository.getExpressionByValue(
      value,
    );

    const expression = expressionFound
      ? expressionFound
      : await expressionRepository.addExpression(value);

    await expressionRepository.addExpressionToUser(userId, expression.id);

    return expression;
  }

  async fetchExpressions(userId) {
    const result = await expressionRepository.getExpressionsByUser(userId);

    const expressions = result ? result.Expressions : [];

    return expressions;
  }

  async removeExpression(expressionId) {
    await expressionRepository.deleteExpression(expressionId);
    await expressionRepository.deleteExpressionFromUsers(expressionId);
  }
}

export default new ExpressionService();
