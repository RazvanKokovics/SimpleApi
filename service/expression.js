import expressionRepository from '../repository/expression';
import { InexistentItem, UnexpectedError } from '../validators/errors';
import { REGULAR_ROLE } from '../constants';

class ExpressionService {
  async insertExpression(userId, value) {
    try {
      const expressionFound = await expressionRepository.getExpressionByValue(
        value,
      );

      const expression = expressionFound
        ? expressionFound
        : await expressionRepository.addExpression(value);

      await expressionRepository.addExpressionToUser(userId, expression.id);

      return expression;
    } catch (error) {
      throw new UnexpectedError();
    }
  }

  async fetchExpressions(userId, role) {
    try {
      const result =
        role === REGULAR_ROLE
          ? await expressionRepository.getUserExpressions(userId)
          : await expressionRepository.getAllExpressions();

      return result;
    } catch (error) {
      throw new UnexpectedError();
    }
  }

  async removeExpression(expressionId) {
    try {
      const deleted = await expressionRepository.deleteExpression(expressionId);

      if (!deleted) {
        throw new InexistentItem(
          'The expression with this id does not exists.',
        );
      }

      return await expressionRepository.deleteUserExpressionByExpressionId(
        expressionId,
      );
    } catch (error) {
      if (error instanceof InexistentItem) {
        throw error;
      }

      throw new UnexpectedError();
    }
  }

  async removeExpressionFromUser(expressionId, userId) {
    try {
      const deleted = await expressionRepository.deleteUserExpressionByExpressionIdAndUserId(
        expressionId,
        userId,
      );

      if (!deleted) {
        throw new InexistentItem('The user did not have such an expression.');
      }
    } catch (error) {
      if (error instanceof InexistentItem) {
        throw error;
      }

      throw new UnexpectedError();
    }
  }
}

export default new ExpressionService();
