import { regularRole } from '../constants';

export default (request, response, next) => {
  const { role } = request.user;

  if (role === regularRole) {
    return response.status(401).send('Access denied!');
  }

  next();
};
