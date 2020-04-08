import { User } from '../models';

class UserRepository {
  constructor(user) {
    this._user = user;
  }

  getUsers() {
    return this._user.findAll();
  }

  addUser(user) {
    return this._user.create(user);
  }

  deleteUser(userName) {
    this._user.destroy({
      where: {
        userName,
      },
    });
  }

  updateUser(user) {
    const { userName } = user;

    return this._user.update(user, {
      returning: true,
      where: {
        userName,
      },
    });
  }

  getUserByUserName(userName) {
    return this._user.findOne({
      where: {
        userName,
      },
    });
  }
}

export default new UserRepository(User);
