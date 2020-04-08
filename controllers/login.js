import { WrongCredential } from '../validators/errors';
import loginService from '../service/login';

class LoginController {
  constructor(loginService) {
    this._loginService = loginService;

    this.login = this.login.bind(this);
  }

  async login(request, response) {
    try {
      const { userName, password } = request.body;

      const token = await this._loginService.userLogin(userName, password);

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

export default new LoginController(loginService);
