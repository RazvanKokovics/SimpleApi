import chai from 'chai';
import chaiHttp from 'chai-http';

import server from '../../index';
import { REGULAR_TOKEN } from '../config';
import expression from '../../repository/expression';
import equation from '../../repository/equation';

chai.use(chaiHttp);
chai.should();

const jwt = REGULAR_TOKEN;

export default () => {
  it('it should delete the expression', async (done) => {
    const response = await chai
      .request(server)
      .get('/expressions')
      .set('auth-token', jwt);

    const expressionId = response.body[0].id;

    chai
      .request(server)
      .delete('/expressions/' + expressionId)
      .set('auth-token', jwt)
      .end((error, response) => {
        response.should.have.status(200);

        response.body.should.be.a('object');
        response.body.should.have.property('status').equal('Success');
        response.body.should.have
          .property('message')
          .equal('Expression deleted from user.');

        done();
      });
  });

  it('it should not delete the expression, 404 not found', (done) => {
    const expressionId = 1;

    chai
      .request(server)
      .delete('/expressions/' + expressionId)
      .set('auth-token', jwt)
      .end((error, response) => {
        response.should.have.status(404);

        response.body.should.be.a('object');
        response.body.should.have.property('status').equal('Failure');
        response.body.should.have
          .property('message')
          .equal('The user did not have such an expression.');

        done();
      });
  });
};
