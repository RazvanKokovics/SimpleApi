import { userLogin } from '../service/login';
import { WrongCredential } from '../validators/errors';

export const login = async (request, response) => {
  try {
    const { userName, password } = request.body;

    const token = await userLogin(userName, password);

    return response.header('auth-token', token).send(token);
  } catch (error) {
    if (error instanceof WrongCredential) {
      return response.status(401).json({
        status: 'Failure.',
        message: error.message,
      });
    }
    return response.status(400).send('An error occured.');
  }
};
