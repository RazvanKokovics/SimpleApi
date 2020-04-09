import chai from 'chai';
import chaiHttp from 'chai-http';

import server from '../../index';
import { adminToken } from '../config';

chai.use(chaiHttp);
chai.should();

const jwt = adminToken;

export default () => {
  it('it should add an user', (done) => {
    const newUser = {
      firstName: 'admin',
      lastName: 'admin',
      email: 'admin@vanil.com',
      password: 'password',
      userName: 'regular',
      role: '2',
    };

    chai
      .request(server)
      .post('/user/register')
      .set('auth-token', jwt)
      .send(newUser)
      .end((error, response) => {
        response.should.have.status(201);

        response.body.should.be.a('object');
        response.body.should.have.property('status').equal('Success.');
        response.body.should.have.property('message').equal('User added.');

        response.body.user.should.have.property('password');
        response.body.user.should.have.property('id');

        response.body.user.should.have.property('firstName').equal('admin');
        response.body.user.should.have.property('lastName').equal('admin');
        response.body.user.should.have
          .property('email')
          .equal('admin@vanil.com');
        response.body.user.should.have.property('userName').equal('regular');
        response.body.user.should.have.property('role').equal(2);

        done();
      });
  });

  it('it should not add an user, firstName and lastName too short', (done) => {
    const newUser = {
      firstName: 'a',
      lastName: 'a',
      email: 'advan@il.com',
      password: 'password',
      userName: 'another',
      role: '1',
    };

    chai
      .request(server)
      .post('/user/register')
      .set('auth-token', jwt)
      .send(newUser)
      .end((error, response) => {
        response.should.have.status(422);
        response.body.should.be.a('object');

        response.body.should.have.property('status').equal('Failure.');
        response.body.should.have
          .property('message')
          .equal(
            'FirstName must be at least 3 characters. LastName must be at least 3 characters.',
          );

        done();
      });
  });

  it('it should not add an user, email is not an email', (done) => {
    const newUser = {
      firstName: 'firstName',
      lastName: 'lastName',
      email: 'advanil.com',
      password: 'password',
      userName: 'another',
      role: '1',
    };

    chai
      .request(server)
      .post('/user/register')
      .set('auth-token', jwt)
      .send(newUser)
      .end((error, response) => {
        response.should.have.status(422);
        response.body.should.be.a('object');

        response.body.should.have.property('status').equal('Failure.');
        response.body.should.have
          .property('message')
          .equal('Email address is not valid.');

        done();
      });
  });

  it('it should not add an user, userName is not unique', (done) => {
    const newUser = {
      firstName: 'firstName',
      lastName: 'lastName',
      email: 'advan@il.com',
      password: 'password',
      userName: 'admin',
      role: '1',
    };

    chai
      .request(server)
      .post('/user/register')
      .set('auth-token', jwt)
      .send(newUser)
      .end((error, response) => {
        response.should.have.status(422);
        response.body.should.be.a('object');

        response.body.should.have.property('status').equal('Failure.');
        response.body.should.have
          .property('message')
          .equal('userName must be unique');

        done();
      });
  });

  it('it should not add an user, jwt is invalid', (done) => {
    const newUser = {
      firstName: 'a',
      lastName: 'a',
      email: 'advan@il.com',
      password: 'password',
      userName: 'another',
      role: '1',
    };

    chai
      .request(server)
      .post('/user/register')
      .set('auth-token', '')
      .send(newUser)
      .end((error, response) => {
        response.should.have.status(401);
        response.should.have.property('text').equal('Access denied!');

        done();
      });
  });
};
