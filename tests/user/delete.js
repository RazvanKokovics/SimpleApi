import chai from 'chai';
import chaiHttp from 'chai-http';

import server from '../../index';
import { ADMIN_TOKEN } from '../config';

chai.use(chaiHttp);
chai.should();

const jwt = ADMIN_TOKEN;

export default () => {
  it('it should delete user', async (done) => {
    const response = await chai
      .request(server)
      .get('/user')
      .set('auth-token', jwt);

    const userId = response.body[response.body.length - 2].id;

    chai
      .request(server)
      .delete('/user/delete/' + userId)
      .set('auth-token', jwt)
      .end((error, response) => {
        response.should.have.status(200);

        response.body.should.be.a('object');
        response.body.should.have.property('status').equal('Success');
        response.body.should.have.property('message').equal('User deleted.');

        done();
      });
  });

  it('it should not delete user, userId does not exists', (done) => {
    const userId = 200000000;

    chai
      .request(server)
      .delete('/user/delete/' + userId)
      .set('auth-token', jwt)
      .end((error, response) => {
        response.should.have.status(404);

        response.body.should.be.a('object');
        response.body.should.have.property('status').equal('Failure.');
        response.body.should.have
          .property('message')
          .equal('UserId does not exists.');

        done();
      });
  });
};
