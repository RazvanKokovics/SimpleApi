import {
  insertExpression,
  fetchExpressions,
  removeExpression,
} from '../service/expression';

export const addExpression = async (request, response) => {
  try {
    const { value } = request.body;
    const { userId } = request.user;

    await insertExpression(userId, value);

    return response.status(200).json({
      status: 'Success',
      message: 'Expression added to user.',
    });
  } catch (error) {
    return response.status(400).send('An error occured.');
  }
};

export const getExpressions = async (request, response) => {
  try {
    const { userId, role } = request.user;

    const expressions = await fetchExpressions(userId, role);

    return response.status(200).json(expressions);
  } catch (error) {
    return response.status(400).send('An error occured.');
  }
};

export const deleteExpression = async (request, response) => {
  try {
    const { expressionId } = request.body;

    await removeExpression(expressionId);

    return response.status(200).json({
      status: 'Success',
      message: 'Expression deleted.',
    });
  } catch (error) {
    return response.status(400).send('An error occured.');
  }
};
