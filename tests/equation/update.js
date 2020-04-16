import chai from 'chai';
import chaiHttp from 'chai-http';

import server from '../../index';
import { ADMIN_TOKEN } from '../config';

chai.use(chaiHttp);
chai.should();

const jwt = ADMIN_TOKEN;

export default () => {
  it('it should update an equation', async (done) => {
    const response = await chai
      .request(server)
      .get('/equations/all')
      .set('auth-token', jwt);

    const length = response.body.length;
    const equationId = response.body[length - 1].id;
    const data = {
      solution: '7',
    };

    chai
      .request(server)
      .put('/equations/' + equationId)
      .set('auth-token', jwt)
      .send(data)
      .end((error, response) => {
        response.should.have.status(200);

        response.body.should.be.a('object');
        response.body.should.have.property('status').equal('Success');
        response.body.should.have
          .property('message')
          .equal('Equation data updated.');

        response.body.equation.should.have.property('id');

        response.body.equation.should.have.property('value').equal('1+6');
        response.body.equation.should.have.property('solution').equal('7');

        done();
      });
  });

  it('it should not update an equation, 404 not found', (done) => {
    const equationId = '20000000';
    const newEquation = {
      solution: '7',
    };

    chai
      .request(server)
      .put('/equations/' + equationId)
      .set('auth-token', jwt)
      .send(newEquation)
      .end((error, response) => {
        response.should.have.status(404);

        response.body.should.be.a('object');
        response.body.should.have.property('status').equal('Failure.');
        response.body.should.have
          .property('message')
          .equal('The equation with this ID does not exist.');

        done();
      });
  });

  it('it should not update an equation, token is invalid', (done) => {
    const equationId = '20000000';
    const newEquation = {
      value: '10+6',
      solution: '16',
    };

    chai
      .request(server)
      .put('/equations/' + equationId)
      .set('auth-token', '')
      .send(newEquation)
      .end((error, response) => {
        response.should.have.status(401);

        response.should.have.property('text').equal('Access denied!');

        done();
      });
  });
};
