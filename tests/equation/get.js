import chai from 'chai';
import chaiHttp from 'chai-http';

import server from '../../index';

chai.use(chaiHttp);
chai.should();

export default () => {
  it('it should get a random equation', (done) => {
    chai
      .request(server)
      .get('/equations')
      .end((error, response) => {
        response.should.have.status(200);

        response.body[0].should.have.property('id');
        response.body[0].should.have.property('value');
        response.body.length.should.be.eql(1);

        done();
      });
  });
};
