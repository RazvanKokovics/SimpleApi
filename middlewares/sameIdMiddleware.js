export default (request, response, next) => {
  const { userId } = request.user;
  const urlUserId = request.params.userId;

  if (urlUserId != userId) {
    return response.status(401).send('Access denied!');
  }

  next();
};
