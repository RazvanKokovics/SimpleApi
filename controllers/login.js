import { WrongCredential } from '../validators/errors';
import loginService from '../service/login';

class LoginController {
  async login(request, response) {
    try {
      const { userName, password } = request.body;

      const token = await loginService.userLogin(userName, password);

      return response.header('auth-token', token).send(token);
    } catch (error) {
      if (error instanceof WrongCredential) {
        return response.status(error.code).json({
          status: 'Failure.',
          message: error.message,
        });
      }

      return response.status(400).send('An error occured.');
    }
  }
}

export default new LoginController();
