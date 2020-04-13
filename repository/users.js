import { Expression, User, UserExpression } from '../models';

class UserRepository {
  getUsers() {
    return User.findAll();
  }

  addUser(user) {
    return User.create(user);
  }

  deleteUser(userName) {
    User.destroy({
      where: {
        userName,
      },
    });
  }

  updateUser(user) {
    const { userName } = user;

    return User.update(user, {
      returning: true,
      where: {
        userName,
      },
    });
  }

  getUserByUserName(userName) {
    return User.findOne({
      where: {
        userName,
      },
    });
  }
}

export default new UserRepository();
