import { userLogin } from '../service/login';

export const login = async (request, response) => {
  try {
    const { userName, password } = request.body;

    const token = await userLogin(userName, password);

    return response.header('auth-token', token).send(token);
  } catch (error) {
    return response.status(400).send('An error occured.');
  }
};
