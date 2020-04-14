import { ValidationError, UniqueConstraintError } from 'sequelize';

import equationService from '../service/equation';
import { extractErrors, InexistentItem } from '../validators/errors';

class EquationController {
  async addEquation(request, response) {
    try {
      const { value, solution } = request.body;

      const equation = await equationService.insertEquation({
        value,
        solution,
      });

      return response.status(201).json({
        status: 'Success',
        message: 'Equation added.',
        equation,
      });
    } catch (error) {
      if (error instanceof ValidationError) {
        return response.status(422).json({
          status: 'Failure.',
          message: extractErrors(error),
        });
      } else if (error instanceof UniqueConstraintError) {
        return response.status(403).json({
          status: 'Failure.',
          message: error.message,
        });
      }

      return response.status(400).send('An error occured.');
    }
  }

  async getRandomEquation(request, response) {
    try {
      const equation = await equationService.getRandomEquation();

      return response.status(200).json(equation);
    } catch (error) {
      return response.status(400).send('An error occured.');
    }
  }

  async deleteEquation(request, response) {
    try {
      const { equationId } = request.body;

      await equationService.removeEquation(equationId);

      return response.status(200).json({
        status: 'Success',
        message: 'Equation deleted.',
      });
    } catch (error) {
      if (error instanceof InexistentItem) {
        return response.status(error.code).json({
          status: 'Failure',
          message: error.message,
        });
      }

      return response.status(400).send('An error occured.');
    }
  }

  async getAllEquations(request, response) {
    try {
      const equations = await equationService.getAll();

      return response.status(200).send(equations);
    } catch (error) {
      return response.status(400).send('An error occured.');
    }
  }

  async updateEquation(request, response) {
    try {
      const { equationId, solution } = request.body;

      const equation = await equationService.changeEquation(
        solution,
        equationId,
      );

      return response.status(200).json({
        status: 'Success',
        message: 'Equation data updated.',
        equation,
      });
    } catch (error) {
      if (error instanceof ValidationError) {
        return response.status(422).json({
          status: 'Failure.',
          message: extractErrors(error),
        });
      } else if (error instanceof InexistentItem) {
        return response.status(error.code).json({
          status: 'Failure.',
          message: error.message,
        });
      }

      return response.status(400).send('An error occured.');
    }
  }

  async checkSolution(request, response) {
    try {
      const { solution, equationId } = request.body;

      const success = await equationService.checkSolution(equationId, solution);

      if (success) {
        return response.status(200).json({
          status: 'Success',
          message: 'The solution is correct.',
        });
      }

      return response.status(200).json({
        status: 'Failure',
        message: 'The solution is not correct.',
      });
    } catch (error) {
      return response.status(400).send('An error occured.');
    }
  }
}

export default new EquationController();
