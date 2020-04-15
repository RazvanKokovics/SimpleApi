import statisticService from '../service/statistic';

class StatisticController {
  async getUserStatistic(request, response) {
    try {
      const users = await statisticService.getUserStatistic();

      return response.status(200).send(users);
    } catch (error) {
      return response.status(error.code).send(error.message);
    }
  }
}

export default new StatisticController();
