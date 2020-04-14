import equationRepository from '../repository/equation';
import { InexistentItem } from '../validators/errors';

class EquationService {
  insertEquation(equation) {
    return equationRepository.addEquation(equation);
  }

  getRandomEquation() {
    return equationRepository.getRandomEquation();
  }

  async removeEquation(equationId) {
    const removed = await equationRepository.deleteEquation(equationId);

    if (!removed) {
      throw new InexistentItem('The equation with this ID does not exist.');
    }
  }

  getAll() {
    return equationRepository.getAllEquations();
  }

  async changeEquation(solution, equationId) {
    const updated = await equationRepository.updateEquation(
      solution,
      equationId,
    );

    if (!updated[0]) {
      throw new InexistentItem('The equation with this ID does not exist.');
    }

    return updated[1][0];
  }

  async checkSolution(equationId, userSolution) {
    const { solution } = await equationRepository.getSolutionByEquationId(
      equationId,
    );

    return solution === userSolution;
  }
}

export default new EquationService();
