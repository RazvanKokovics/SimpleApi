import { UnexpectedError } from '../validators/errors';

import userRepository from '../repository/users';
import equationRepository from '../repository/equation';
import expressionRepository from '../repository/expression';
import { ADMIN_ROLE } from '../constants';

class StatisticService {
  async getUserRoleStatistic() {
    try {
      const queryResult = await userRepository.getUserRoleStatistic();

      var data = {
        admin: 0,
        users: 0,
      };

      queryResult.forEach(({ dataValues: element }) => {
        data =
          element.role == ADMIN_ROLE
            ? { ...data, admin: element.count }
            : { ...data, users: element.count };
      });

      return data;
    } catch (error) {
      throw new UnexpectedError();
    }
  }

  async getEquationSolutionStatistic() {
    try {
      const queryResult = await equationRepository.getEquationSolutionStatistic();

      let solutions = {};

      queryResult.forEach(({ dataValues: element }) => {
        solutions[element.solution] = element.count;
      });

      return solutions;
    } catch (error) {
      throw new UnexpectedError();
    }
  }

  async getUserExpressionsStatisticByUser() {
    try {
      const queryResult = await userRepository.getUserExpressionsStatisticByUser();

      let counts = {};

      queryResult.forEach(({ dataValues: element }) => {
        counts[element.userId] = element.count;
      });

      return counts;
    } catch (error) {
      throw new UnexpectedError();
    }
  }

  async getUserExpressionsStatisticByExpression() {
    try {
      const queryResult = await expressionRepository.getUserExpressionsStatisticByExpression();

      let counts = {};

      queryResult.forEach(({ dataValues: element }) => {
        counts[element.expressionId] = element.count;
      });

      return counts;
    } catch (error) {
      throw new UnexpectedError();
    }
  }
}

export default new StatisticService();
