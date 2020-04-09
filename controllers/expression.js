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
      return response.status(400).send('An error occured.');
    }
  }

  async getExpressions(request, response) {
    try {
      const { userId } = request.user;

      const expressions = await expressionService.fetchExpressions(userId);

      return response.status(200).json(expressions);
    } catch (error) {
      return response.status(400).send('An error occured.');
    }
  }

  async deleteExpression(request, response) {
    try {
      const { expressionId } = request.body;

      await expressionService.removeExpression(expressionId);

      return response.status(200).json({
        status: 'Success',
        message: 'Expression deleted.',
      });
    } catch (error) {
      return response.status(400).send('An error occured.');
    }
  }
}

export default new ExpressionController();
