import chai from 'chai';
import chaiHttp from 'chai-http';

import server from '../../index';
import { regularToken } from '../config';

chai.use(chaiHttp);
chai.should();

const jwt = regularToken;

export default () => {
  it('it should not delete the expression, 404 not found', (done) => {
    const data = {
      expressionId: 1,
    };

    chai
      .request(server)
      .delete('/expression')
      .set('auth-token', jwt)
      .send(data)
      .end((error, response) => {
        response.should.have.status(404);

        done();
      });
  });
};
