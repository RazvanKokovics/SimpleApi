import chai from 'chai';
import chaiHttp from 'chai-http';

import server from '../../index';
import { ADMIN_TOKEN } from '../config';

chai.use(chaiHttp);
chai.should();

const jwt = ADMIN_TOKEN;

export default () => {
  it('it should delete the equation', async (done) => {
    const response = await chai
      .request(server)
      .get('/equations/all')
      .set('auth-token', jwt);

    const length = response.body.length;

    const data = {
      equationId: response.body[length - 1].id,
    };

    chai
      .request(server)
      .delete('/equations')
      .set('auth-token', jwt)
      .send(data)
      .end((error, response) => {
        response.should.have.status(200);

        response.body.should.be.a('object');
        response.body.should.have.property('status').equal('Success');
        response.body.should.have
          .property('message')
          .equal('Equation deleted.');

        done();
      });
  });

  it('it should not delete the equation, 404 not found', (done) => {
    const data = {
      equationId: 1000000,
    };

    chai
      .request(server)
      .delete('/equations')
      .set('auth-token', jwt)
      .send(data)
      .end((error, response) => {
        response.should.have.status(404);

        response.body.should.be.a('object');
        response.body.should.have.property('status').equal('Failure');
        response.body.should.have
          .property('message')
          .equal('The equation with this ID does not exist.');

        done();
      });
  });
};
