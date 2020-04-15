import chai from 'chai';
import chaiHttp from 'chai-http';

import server from '../../index';
import { ADMIN_TOKEN } from '../config';

chai.use(chaiHttp);
chai.should();

const jwt = ADMIN_TOKEN;

export default () => {
  it('it should add an equation', (done) => {
    const newEquation = {
      value: '1+6',
      solution: '7',
    };

    chai
      .request(server)
      .post('/equations')
      .set('auth-token', jwt)
      .send(newEquation)
      .end((error, response) => {
        response.should.have.status(201);

        response.body.should.be.a('object');
        response.body.should.have.property('status').equal('Success');
        response.body.should.have.property('message').equal('Equation added.');

        response.body.equation.should.have.property('id');

        response.body.equation.should.have.property('value').equal('1+6');
        response.body.equation.should.have.property('solution').equal('7');

        done();
      });
  });

  it('it should not add an equation, value is not unique', (done) => {
    const newEquation = {
      value: '1+6',
      solution: '7',
    };

    chai
      .request(server)
      .post('/equations')
      .set('auth-token', jwt)
      .send(newEquation)
      .end((error, response) => {
        response.should.have.status(422);
        response.body.should.be.a('object');

        response.body.should.have.property('status').equal('Failure.');
        response.body.should.have
          .property('message')
          .equal('value must be unique');

        done();
      });
  });

  it('it should not add an equation, token is invalid', (done) => {
    const newEquation = {
      value: '10+6',
      solution: '16',
    };

    chai
      .request(server)
      .post('/equations')
      .set('auth-token', '')
      .send(newEquation)
      .end((error, response) => {
        response.should.have.status(401);

        response.should.have.property('text').equal('Access denied!');

        done();
      });
  });
};
