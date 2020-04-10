import chai from 'chai';
import chaiHttp from 'chai-http';

import server from '../../index';
import { regularToken } from '../config';

chai.use(chaiHttp);
chai.should();

const jwt = regularToken;

export default () => {
  it('it should delete the expression', async (done) => {
    const response = await chai
      .request(server)
      .get('/expressions')
      .set('auth-token', jwt);

    console.log(response.body);
    const data = {
      expressionId: response.body[0].id,
    };
    chai
      .request(server)
      .delete('/expressions')
      .set('auth-token', jwt)
      .send(data)
      .end((error, response) => {
        response.should.have.status(200);

        response.body.should.be.a('object');
        response.body.should.have.property('status').equal('Success');
        response.body.should.have
          .property('message')
          .equal('Expression deleted.');

        done();
      });
  });

  it('it should not delete the expression, 404 not found', (done) => {
    const data = {
      expressionId: 1,
    };

    chai
      .request(server)
      .delete('/expressions')
      .set('auth-token', jwt)
      .send(data)
      .end((error, response) => {
        response.should.have.status(404);

        response.body.should.be.a('object');
        response.body.should.have.property('status').equal('Failure');
        response.body.should.have
          .property('message')
          .equal('ExpressionId does not exists.');

        done();
      });
  });
};
