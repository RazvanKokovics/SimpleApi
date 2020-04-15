import { UnexpectedError } from '../validators/errors';

import userRepository from '../repository/users';
import { ADMIN_ROLE, REGULAR_ROLE } from '../constants';

class StatisticService {
  async getUserStatistic() {
    try {
      const queryResult = await userRepository.getUserStatistic();

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
}

export default new StatisticService();
