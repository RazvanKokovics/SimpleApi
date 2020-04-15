import expressionService from '../service/expression';

class ExpressionController {
  async addExpression(request, response) {
    try {
      const { value } = request.body;
      const { userId } = request.user;

      const expression = await expressionService.insertExpression(
        userId,
        value,
      );

      return response.status(201).json({
        status: 'Success',
        message: 'Expression added to user.',
        expression,
      });
    } catch (error) {
      return response.status(error.code).send(error.message);
    }
  }

  async getExpressions(request, response) {
    try {
      const { userId, role } = request.user;

      const expressions = await expressionService.fetchExpressions(
        userId,
        role,
      );

      return response.status(200).json(expressions);
    } catch (error) {
      return response.status(error.code).send(error.message);
    }
  }

  async deleteExpression(request, response) {
    try {
      const expressionId = request.params.id;

      await expressionService.removeExpression(expressionId);

      return response.status(200).json({
        status: 'Success',
        message: 'Expression deleted.',
      });
    } catch (error) {
      return response.status(error.code).send(error.message);
    }
  }

  async deleteExpressionFromUser(request, response) {
    try {
      const { expressionId } = request.params;
      const userId = request.user.id;

      await expressionService.removeExpressionFromUser(expressionId, userId);

      return response.status(200).json({
        status: 'Success',
        message: 'Expression deleted from user.',
      });
    } catch (error) {
      return response.status(error.code).send(error.message);
    }
  }
}

export default new ExpressionController();
