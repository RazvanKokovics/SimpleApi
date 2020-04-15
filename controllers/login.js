import loginService from '../service/login';

class LoginController {
  async login(request, response) {
    try {
      const { userName, password } = request.body;

      const token = await loginService.userLogin(userName, password);

      return response.header('auth-token', token).send(token);
    } catch (error) {
      return response.status(error.code).send(error.message);
    }
  }
}

export default new LoginController();
