export default (request, response, next) => {
  const { role } = request.user;

  if (role === 2) {
    return response.status(401).send('Access denied!');
  }

  next();
};
