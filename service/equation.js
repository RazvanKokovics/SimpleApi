import { ValidationError, UniqueConstraintError } from 'sequelize';

import equationRepository from '../repository/equation';
import {
  InexistentItem,
  CustomUniqueConstraintError,
  CustomValidationError,
  UnexpectedError,
} from '../validators/errors';

class EquationService {
  async insertEquation(equation) {
    try {
      return await equationRepository.addEquation(equation);
    } catch (error) {
      if (error instanceof UniqueConstraintError) {
        throw new CustomUniqueConstraintError(error.message);
      }
      if (error instanceof ValidationError) {
        throw new CustomValidationError(error);
      }

      throw new UnexpectedError();
    }
  }

  async getRandomEquation() {
    try {
      return await equationRepository.getRandomEquation();
    } catch (error) {
      throw new UnexpectedError();
    }
  }

  async removeEquation(equationId) {
    try {
      const removed = await equationRepository.deleteEquation(equationId);

      if (!removed) {
        throw new InexistentItem('The equation with this ID does not exist.');
      }
    } catch (error) {
      if (error instanceof InexistentItem) {
        throw error;
      }

      throw new UnexpectedError();
    }
  }

  async getAll() {
    try {
      return await equationRepository.getAllEquations();
    } catch (error) {
      throw new UnexpectedError();
    }
  }

  async changeEquation(solution, equationId) {
    try {
      const updated = await equationRepository.updateEquation(
        solution,
        equationId,
      );

      if (!updated[0]) {
        throw new InexistentItem('The equation with this ID does not exist.');
      }

      return updated[1][0];
    } catch (error) {
      if (error instanceof InexistentItem) {
        throw error;
      }
      if (error instanceof ValidationError) {
        throw new CustomValidationError(error);
      }

      throw new UnexpectedError();
    }
  }

  async checkSolution(equationId, userSolution) {
    try {
      const { solution } = await equationRepository.getSolutionByEquationId(
        equationId,
      );

      return solution === userSolution;
    } catch (error) {
      throw new UnexpectedError();
    }
  }
}

export default new EquationService();
