import chai from 'chai';
import chaiHttp from 'chai-http';

import server from '../../index';
import { adminToken } from '../config';

chai.use(chaiHttp);
chai.should();

const jwt = adminToken;

export default () => {
  it('it should delete user', (done) => {
    const data = {
      userName: 'regular',
    };

    chai
      .request(server)
      .delete('/user/delete')
      .set('auth-token', jwt)
      .send(data)
      .end((error, response) => {
        response.should.have.status(200);

        response.body.should.be.a('object');
        response.body.should.have.property('status').equal('Success');
        response.body.should.have.property('message').equal('User deleted.');

        done();
      });
  });

  it('it should not delete user, username does not exists', (done) => {
    const data = {
      userName: 'inexistent',
    };

    chai
      .request(server)
      .delete('/user/delete')
      .set('auth-token', jwt)
      .send(data)
      .end((error, response) => {
        response.should.have.status(404);

        response.body.should.be.a('object');
        response.body.should.have.property('status').equal('Failure.');
        response.body.should.have
          .property('message')
          .equal('Username does not exists.');

        done();
      });
  });
};
