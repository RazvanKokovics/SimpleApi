import chai from 'chai';
import chaiHttp from 'chai-http';

import server from '../../index';
import { regularToken } from '../config';

chai.use(chaiHttp);
chai.should();

const jwt = regularToken;

export default () => {
  it('it should add an expression', (done) => {
    const newExpression = {
      value: '3+4',
    };

    chai
      .request(server)
      .post('/expressions')
      .set('auth-token', jwt)
      .send(newExpression)
      .end((error, response) => {
        response.should.have.status(201);

        response.body.should.have.property('status').equal('Success');
        response.body.should.have
          .property('message')
          .equal('Expression added to user.');

        response.body.expression.should.have.property('value').equal('3+4');
        response.body.expression.should.have.property('id');

        done();
      });
  });
};
