import { REGULAR_ROLE } from '../constants';

export default (request, response, next) => {
  const { role } = request.user;

  if (role === REGULAR_ROLE) {
    return response.status(401).send('Access denied!');
  }

  next();
};
