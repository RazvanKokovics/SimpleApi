require('dotenv').config();
import chai from 'chai';
import chaiHttp from 'chai-http';

import server from '../index';

chai.use(chaiHttp);
chai.should();

export default () => {
  it('it should login the user and return the jwt', (done) => {
    const credentials = {
      password: 'password',
      userName: 'regularUser',
    };

    chai
      .request(server)
      .post('/login')
      .send(credentials)
      .end((error, response) => {
        response.should.have.status(200);
        response.text.length.should.be.above(0);

        done();
      });
  });

  it('it should not login the user, userName not valid', (done) => {
    const credentials = {
      password: 'password',
      userName: 'administrator',
    };

    chai
      .request(server)
      .post('/login')
      .send(credentials)
      .end((error, response) => {
        response.should.have.status(401);

        response.body.should.be.a('object');
        response.body.should.have.property('status').equal('Failure.');
        response.body.should.have
          .property('message')
          .equal('Username does not exist.');

        done();
      });
  });

  it('it should not login the user, password is incorrect', (done) => {
    const credentials = {
      password: 'passwd',
      userName: 'admin',
    };

    chai
      .request(server)
      .post('/login')
      .send(credentials)
      .end((error, response) => {
        response.should.have.status(401);

        response.body.should.be.a('object');
        response.body.should.have.property('status').equal('Failure.');
        response.body.should.have
          .property('message')
          .equal('Password is incorrect.');

        done();
      });
  });
};
