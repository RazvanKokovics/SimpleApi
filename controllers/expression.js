import expressionService from '../service/expression';

class ExpressionController {
  constructor(expressionService) {
    this._expressionService = expressionService;

    this.addExpression = this.addExpression.bind(this);
    this.getExpressions = this.getExpressions.bind(this);
    this.deleteExpression = this.deleteExpression.bind(this);
  }

  async addExpression(request, response) {
    try {
      const { value } = request.body;
      const { userId } = request.user;

      const expression = await this._expressionService.insertExpression(
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
      const { userId, role } = request.user;

      const expressions = await this._expressionService.fetchExpressions(
        userId,
        role,
      );

      return response.status(200).json(expressions);
    } catch (error) {
      return response.status(400).send('An error occured.');
    }
  }

  async deleteExpression(request, response) {
    try {
      const { expressionId } = request.body;

      await this._expressionService.removeExpression(expressionId);

      return response.status(200).json({
        status: 'Success',
        message: 'Expression deleted.',
      });
    } catch (error) {
      return response.status(400).send('An error occured.');
    }
  }
}

export default new ExpressionController(expressionService);
