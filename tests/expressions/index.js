import chai from 'chai';
import chaiHttp from 'chai-http';

import GET from './get';
import GET_ALL from './getall';
import ADD from './add';
import DELETE from './delete';

chai.use(chaiHttp);
chai.should();

export default () => {
  describe('Add expression', ADD);

  describe('Get expressions', GET);

  describe('Get all expressions', GET_ALL);

  describe('Delete expression', DELETE);
};
