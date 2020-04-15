import statisticService from '../service/statistic';

class StatisticController {
  async getUserRoleStatistic(request, response) {
    try {
      const users = await statisticService.getUserRoleStatistic();

      return response.status(200).send(users);
    } catch (error) {
      return response.status(error.code).send(error.message);
    }
  }

  async getEquationSolutionStatistic(request, response) {
    try {
      const equations = await statisticService.getEquationSolutionStatistic();

      return response.status(200).send(equations);
    } catch (error) {
      return response.status(error.code).send(error.message);
    }
  }

  async getUserExpressionsStatisticByUser(request, response) {
    try {
      const usersExpressions = await statisticService.getUserExpressionsStatisticByUser();

      return response.status(200).send(usersExpressions);
    } catch (error) {
      return response.status(error.code).send(error.message);
    }
  }

  async getUserExpressionsStatisticByExpression(request, response) {
    try {
      const usersExpressions = await statisticService.getUserExpressionsStatisticByExpression();

      return response.status(200).send(usersExpressions);
    } catch (error) {
      return response.status(error.code).send(error.message);
    }
  }
}

export default new StatisticController();
