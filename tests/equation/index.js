import chai from 'chai';
import chaiHttp from 'chai-http';

import ADD from './add';
import DELETE from './delete';
import GETALL from './getall';
import GET from './get';
import UPDATE from './update';

chai.use(chaiHttp);
chai.should();

export default () => {
  describe('Add equation', ADD);

  describe('Get random equation', GET);

  describe('Get all equations', GETALL);

  describe('Update equation', UPDATE);

  describe('Delete equation', DELETE);
};
