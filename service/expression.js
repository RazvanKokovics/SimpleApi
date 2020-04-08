import expressionRepository from '../repository/expression';

class ExpressionService {
  constructor(expressionRepository) {
    this._expressionRepository = expressionRepository;

    this.insertExpression = this.insertExpression.bind(this);
    this.removeExpression = this.removeExpression.bind(this);
    this.fetchExpressions = this.fetchExpressions.bind(this);
  }

  async insertExpression(userId, value) {
    const expressionFound = await this._expressionRepository.getExpressionByValue(
      value,
    );

    const expression = expressionFound
      ? expressionFound
      : await this._expressionRepository.addExpression(value);

    await this._expressionRepository.addExpressionToUser(userId, expression.id);

    return expression;
  }

  async fetchExpressions(userId) {
    const result = await this._expressionRepository.getExpressionsByUser(
      userId,
    );

    const expressions = result ? result.Expressions : [];
    return expressions;
  }

  async removeExpression(expressionId) {
    await this._expressionRepository.deleteExpression(expressionId);
    await this._expressionRepository.deleteExpressionFromUsers(expressionId);
  }
}

export default new ExpressionService(expressionRepository);
