import chai from 'chai';
import chaiHttp from 'chai-http';

import server from '../../index';
import { ADMIN_TOKEN, REGULAR_TOKEN } from '../config';

chai.use(chaiHttp);
chai.should();

const jwt = ADMIN_TOKEN;

export default () => {
  it('it should update an user, new first and last names, new email', async (done) => {
    const response = await chai
      .request(server)
      .get('/user')
      .set('auth-token', jwt);

    const userId = response.body[response.body.length - 1].id;

    const newUser = {
      firstName: 'newFirstName',
      lastName: 'newLastName',
      email: 'advan@il.com',
    };

    chai
      .request(server)
      .put('/user/update/' + userId)
      .set('auth-token', jwt)
      .send(newUser)
      .end((error, response) => {
        response.should.have.status(200);

        response.body.should.be.a('object');
        response.body.should.have.property('status').equal('Success');
        response.body.should.have
          .property('message')
          .equal('User data updated.');

        response.body.user.should.have.property('password');
        response.body.user.should.have.property('id');

        response.body.user.should.have
          .property('firstName')
          .equal('newFirstName');
        response.body.user.should.have
          .property('lastName')
          .equal('newLastName');
        response.body.user.should.have.property('email').equal('advan@il.com');
        response.body.user.should.have.property('userName').equal('AddedUser');
        response.body.user.should.have.property('role').equal(2);

        done();
      });
  });

  it('it should not update an user, userId not found', (done) => {
    const userId = 200000000;

    const newUser = {
      firstName: 'newFirstName',
      lastName: 'newLastName',
      email: 'advan@il.com',
      password: 'password',
      role: '1',
    };

    chai
      .request(server)
      .put('/user/update/' + userId)
      .set('auth-token', jwt)
      .send(newUser)
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

  it('it should not update an user, first and last names too short', async (done) => {
    const response = await chai
      .request(server)
      .get('/user')
      .set('auth-token', jwt);

    const userId = response.body[response.body.length - 1].id;

    const newUser = {
      firstName: 'ne',
      lastName: 'ne',
      email: 'advan@il.com',
      password: 'password',
      role: '1',
    };

    chai
      .request(server)
      .put('/user/update/' + userId)
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

  it('it should not update an user, email is not an email', async (done) => {
    const response = await chai
      .request(server)
      .get('/user')
      .set('auth-token', jwt);

    const userId = response.body[response.body.length - 1].id;

    const newUser = {
      firstName: 'newFirst',
      lastName: 'newLast',
      email: 'advanil.com',
      password: 'password',
      role: '1',
    };

    chai
      .request(server)
      .put('/user/update/' + userId)
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

  it('it should not update an user, jwt is invalid', async (done) => {
    const response = await chai
      .request(server)
      .get('/user')
      .set('auth-token', jwt);

    const userId = response.body[response.body.length - 1].id;

    const newUser = {
      firstName: 'newFirst',
      lastName: 'newLast',
      email: 'advanil.com',
      password: 'password',
      role: '1',
    };

    chai
      .request(server)
      .put('/user/update/' + userId)
      .set('auth-token', '')
      .send(newUser)
      .end((error, response) => {
        response.should.have.status(401);
        response.should.have.property('text').equal('Access denied!');

        done();
      });
  });

  it('it should update himself (user)', (done) => {
    const newUser = {
      firstName: 'newFirst',
      lastName: 'newLast',
      role: '1',
    };

    chai
      .request(server)
      .put('/user/update/account/878')
      .set('auth-token', REGULAR_TOKEN)
      .send(newUser)
      .end((error, response) => {
        response.should.have.status(200);

        response.body.should.be.a('object');
        response.body.should.have.property('status').equal('Success');
        response.body.should.have
          .property('message')
          .equal('User data updated.');

        response.body.user.should.have.property('password');
        response.body.user.should.have.property('id');

        response.body.user.should.have.property('firstName').equal('newFirst');
        response.body.user.should.have.property('lastName').equal('newLast');
        response.body.user.should.have
          .property('email')
          .equal('newRaz@vanil.com');
        response.body.user.should.have
          .property('userName')
          .equal('regularUser');
        response.body.user.should.have.property('role').equal(2);

        done();
      });
  });
};
