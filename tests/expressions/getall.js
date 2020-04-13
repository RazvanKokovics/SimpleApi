import chai from 'chai';
import chaiHttp from 'chai-http';

import server from '../../index';
import { adminToken } from '../config';

chai.use(chaiHttp);
chai.should();

const jwt = adminToken;

export default () => {
  it('it should get all the expressions', (done) => {
    chai
      .request(server)
      .get('/expressions')
      .set('auth-token', jwt)
      .end((error, response) => {
        response.should.have.status(200);

        response.body.should.be.a('array');
        response.body.length.should.be.eql(3);

        done();
      });
  });
};
