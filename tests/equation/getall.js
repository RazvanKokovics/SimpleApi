import chai from 'chai';
import chaiHttp from 'chai-http';

import server from '../../index';
import { ADMIN_TOKEN } from '../config';

chai.use(chaiHttp);
chai.should();

const jwt = ADMIN_TOKEN;

export default () => {
  it('it should get all the equations', (done) => {
    chai
      .request(server)
      .get('/equations/all')
      .set('auth-token', jwt)
      .end((error, response) => {
        response.should.have.status(200);

        response.body.should.be.a('array');
        response.body.length.should.be.eql(1);

        done();
      });
  });

  it('it should not get all the equations, invalid token', (done) => {
    chai
      .request(server)
      .get('/equations/all')
      .set('auth-token', '')
      .end((error, response) => {
        response.should.have.status(401);

        response.should.have.property('text').equal('Access denied!');

        done();
      });
  });
};
