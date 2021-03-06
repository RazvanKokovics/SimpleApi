import chai from 'chai';
import chaiHttp from 'chai-http';

import login from './login';
import user from './user';
import expressions from './expressions';
import equation from './equation';

chai.use(chaiHttp);
chai.should();

describe('All tests:', () => {
  describe('Login Enpoint', login);

  describe('Users Endpoint', user);

  describe('Expressions Endpoint', expressions);

  describe('Equation Endpoint', equation);
});
