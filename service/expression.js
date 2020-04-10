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

  async fetchExpressions(userId, role) {
    const result =
      role === 2
        ? await expressionRepository.getExpressionsByUser(userId)
        : await expressionRepository.getAllExpressions();

    return result;
  }

  async removeExpression(expressionId) {
    await expressionRepository.deleteExpression(expressionId);
    await expressionRepository.deleteExpressionFromUsers(expressionId);
  }
}

export default new ExpressionService();
