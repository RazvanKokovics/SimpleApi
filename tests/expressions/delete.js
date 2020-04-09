import chai from 'chai';
import chaiHttp from 'chai-http';

import server from '../../index';
import { regularToken } from '../config';

chai.use(chaiHttp);
chai.should();

const jwt = regularToken;

export default () => {
  it('it should not delete the expression, 404 not found', async (done) => {
    const response = await chai
      .request(server)
      .get('/expressions')
      .set('auth-token', jwt);

    const data = {
      expressionId: response.body.Expressions[0].id,
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
};
