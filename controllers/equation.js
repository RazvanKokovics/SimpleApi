import equationService from '../service/equation';

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
      return response.status(error.code).send(error.message);
    }
  }

  async getRandomEquation(request, response) {
    try {
      const equation = await equationService.getRandomEquation();

      return response.status(200).json(equation);
    } catch (error) {
      return response.status(error.code).send(error.message);
    }
  }

  async deleteEquation(request, response) {
    try {
      const { equationId } = request.params;

      await equationService.removeEquation(equationId);

      return response.status(200).json({
        status: 'Success',
        message: 'Equation deleted.',
      });
    } catch (error) {
      return response.status(error.code).send(error.message);
    }
  }

  async getAllEquations(request, response) {
    try {
      const equations = await equationService.getAll();

      return response.status(200).send(equations);
    } catch (error) {
      return response.status(error.code).send(error.message);
    }
  }

  async updateEquation(request, response) {
    try {
      const { solution } = request.body;
      const { equationId } = request.params;

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
      return response.status(error.code).send(error.message);
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
      return response.status(error.code).send(error.message);
    }
  }
}

export default new EquationController();
