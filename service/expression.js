import expressionRepository from '../repository/expression';
import { InexistentItem } from '../validators/errors';
import { REGULAR_ROLE } from '../constants';

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
      role === REGULAR_ROLE
        ? await expressionRepository.getUserExpressions(userId)
        : await expressionRepository.getAllExpressions();

    return result;
  }

  async removeExpression(expressionId) {
    const deleted = await expressionRepository.deleteExpression(expressionId);

    if (!deleted) {
      throw new InexistentItem('The expression with this id does not exists.');
    }

    return expressionRepository.deleteExpressionFromUser(expressionId);
  }

  async removeExpressionFromUser(expressionId, userId) {
    const deleted = await expressionRepository.deleteExpressionFromUser(
      expressionId,
      userId,
    );

    if (!deleted) {
      throw new InexistentItem('The user did not have such an expression.');
    }
  }
}

export default new ExpressionService();
