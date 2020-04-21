import { Equation } from '../models';

const Sequelize = require('sequelize');

class EquationRepository {
  addEquation(equation) {
    return Equation.create(equation);
  }

  getRandomEquation() {
    return Equation.findAll({
      order: Sequelize.literal('random()'),
      limit: 1,
      attributes: ['id', 'value'],
    });
  }

  deleteEquation(equationId) {
    return Equation.destroy({
      where: {
        id: equationId,
      },
    });
  }

  getAllEquations() {
    return Equation.findAll();
  }

  updateEquation(solution, equationId) {
    return Equation.update(
      { solution },
      {
        returning: true,
        where: {
          id: equationId,
        },
      },
    );
  }

  getSolutionByEquationId(equationId) {
    return Equation.findOne({
      where: {
        id: equationId,
      },
    });
  }

  getEquationSolutionStatistic() {
    return Equation.findAll({
      attributes: [
        'solution',
        [Sequelize.fn('COUNT', Sequelize.col('solution')), 'count'],
      ],
      group: 'solution',
    });
  }
}

export default new EquationRepository();
