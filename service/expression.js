import {
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

  return await addExpressionToUser(userId, id);
};

export const fetchExpressions = async (userId) => {
  const expressions = await getExpressionsByUser(userId);

  return expressions.Expressions;
};

export const removeExpression = async (expressionId) => {
  await deleteExpression(expressionId);

  await deleteExpressionFromUsers(expressionId);

  return;
};
