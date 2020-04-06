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

  await addExpressionToUser(userId, id);
};

export const fetchExpressions = async (userId) => {
  const result = await getExpressionsByUser(userId);

  const expressions = result ? result.Expressions : [];
  return expressions;
};

export const removeExpression = async (expressionId) => {
  await deleteExpression(expressionId);
  await deleteExpressionFromUsers(expressionId);
};
