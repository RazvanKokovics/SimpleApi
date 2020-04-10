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

  getUserExpressions(userId) {
    return User.findByPk(userId, {
      attributes: [],
      include: [
        {
          model: Expression,
          as: 'Expressions',
          required: false,
          attributes: ['id', 'value'],
          through: {
            model: UserExpression,
            attributes: [],
          },
        },
      ],
    });
  }
}

export default new UserRepository();
