import expressionRepository from '../repository/expression';
import { InexistentItem } from '../validators/errors';

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
    const deleted = await expressionRepository.deleteExpression(expressionId);

    if (!deleted) {
      throw new InexistentItem('ExpressionId does not exists.');
    }

    expressionRepository.deleteExpressionFromUsers(expressionId);
  }
}

export default new ExpressionService();
