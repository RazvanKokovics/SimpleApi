import {
  getAllExpressions,
  getExpressionByValue,
  addExpression,
  addExpressionToUser,
  getExpressionsByUser,
  deleteExpression,
  deleteExpressionFromUsers,
} from '../repository/expression';

export const insertExpression = async (userId, value) => {
  const expressionFound = await getExpressionByValue(value);

  const { id } = expressionFound ? expressionFound : await addExpression(value);

  await addExpressionToUser(userId, id);
};

export const fetchExpressions = async (userId, role) => {
  const result =
    role === 1 ? await getExpressionsByUser(userId) : await getAllExpressions();

  return result;
};

export const removeExpression = async (expressionId) => {
  await deleteExpression(expressionId);
  await deleteExpressionFromUsers(expressionId);
};
