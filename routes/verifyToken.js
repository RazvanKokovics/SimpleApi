import jwt from 'jsonwebtoken';

export default function (request, response, next) {
  const token = request.header('auth-token');

  if (!token) {
    return response.status(401).send('Access denied!');
  }

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    request.user = verified;

    next();
  } catch (err) {
    return response.status(401).send('Invalid token!');
  }
}
