import chai from 'chai';
import chaiHttp from 'chai-http';

import GET from './get';
import ADD from './add';
import UPDATE from './update';
import DELETE from './delete';

chai.use(chaiHttp);
chai.should();

export default () => {
  describe('Get users', GET);

  describe('Add user', ADD);

  describe('Update user', UPDATE);

  describe('Delete user', DELETE);
};
