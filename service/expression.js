import expressionRepository from '../repository/expression';
<<<<<<< HEAD
import { REGULAR_ROLE } from '../constants';
=======
import { InexistentItem } from '../validators/errors';
>>>>>>> 641600b... Response 404 - deleting inexistent entity.

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
      throw new InexistentItem('ExpressionId does not exists.');
    }

    expressionRepository.deleteExpressionFromUsers(expressionId);
  }
}

export default new ExpressionService();
