import chai from 'chai';
import chaiHttp from 'chai-http';
import bcrypt from 'bcryptjs';

import { User } from '../models';
import server from '../index';

chai.use(chaiHttp);
chai.should();

describe('Users', () => {
  before(async (next) => {
    await User.destroy({ where: {} });

    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash('password', salt);

    await User.create({
      firstName: 'admin',
      lastName: 'admin',
      email: 'admin@vanil.com',
      password,
      userName: 'admin',
      role: '1',
    });

    next();
  });

  describe('Users Endpoint', () => {
    let jwt = '';

    describe('Login User', () => {
      it('it should login the user and return the jwt', (done) => {
        const credentials = {
          password: 'password',
          userName: 'admin',
        };

        chai
          .request(server)
          .post('/login')
          .send(credentials)
          .end((error, response) => {
            response.should.have.status(200);
            response.text.length.should.be.above(0);

            jwt = response.text;

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
    });

    describe('Get users', () => {
      it('it should get all the users', (done) => {
        chai
          .request(server)
          .get('/user')
          .set('auth-token', jwt)
          .end((error, response) => {
            response.should.have.status(200);

            response.body.should.be.a('array');
            response.body.length.should.be.eql(1);

            done();
          });
      });

      it('it should not get all the users, jwt invalid', (done) => {
        chai
          .request(server)
          .get('/user')
          .set('auth-token', '')
          .end((error, response) => {
            response.should.have.status(401);

            response.should.have.property('text').equal('Access denied!');

            done();
          });
      });
    });

    describe('Add user', () => {
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
            response.body.user.should.have
              .property('userName')
              .equal('regular');
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
    });

    describe('Update user', () => {
      it('it should update an user, new first and last names, new email', (done) => {
        const newUser = {
          firstName: 'newFirstName',
          lastName: 'newLastName',
          email: 'advan@il.com',
          password: 'password',
          userName: 'admin',
          role: '1',
        };

        chai
          .request(server)
          .put('/user/update')
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
            response.body.user.should.have
              .property('email')
              .equal('advan@il.com');
            response.body.user.should.have.property('userName').equal('admin');
            response.body.user.should.have.property('role').equal(1);

            console.log(response.body);
            done();
          });
      });

      it('it should not update an user, username not found', (done) => {
        const newUser = {
          firstName: 'newFirstName',
          lastName: 'newLastName',
          email: 'advan@il.com',
          password: 'password',
          userName: 'administrator',
          role: '1',
        };

        chai
          .request(server)
          .put('/user/update')
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

      it('it should not update an user, first and last names too short', (done) => {
        const newUser = {
          firstName: 'ne',
          lastName: 'ne',
          email: 'advan@il.com',
          password: 'password',
          userName: 'admin',
          role: '1',
        };

        chai
          .request(server)
          .put('/user/update')
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

      it('it should not update an user, email is not an email', (done) => {
        const newUser = {
          firstName: 'newFirst',
          lastName: 'newLast',
          email: 'advanil.com',
          password: 'password',
          userName: 'admin',
          role: '1',
        };

        chai
          .request(server)
          .put('/user/update')
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

      it('it should not update an user, jwt is invalid', (done) => {
        const newUser = {
          firstName: 'newFirst',
          lastName: 'newLast',
          email: 'advanil.com',
          password: 'password',
          userName: 'admin',
          role: '1',
        };

        chai
          .request(server)
          .put('/user/update')
          .set('auth-token', '')
          .send(newUser)
          .end((error, response) => {
            response.should.have.status(401);
            response.should.have.property('text').equal('Access denied!');

            done();
          });
      });
    });

    describe('Delete user', () => {
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
            response.body.should.have
              .property('message')
              .equal('User deleted.');

            done();
          });
      });
    });
  });
});
