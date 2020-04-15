import sequelize from 'sequelize';

import { User, UserExpression } from '../models';

class UserRepository {
  getUsers() {
    return User.findAll();
  }

  addUser(user) {
    return User.create(user);
  }

  deleteUser(userId) {
    return User.destroy({
      where: {
        id: userId,
      },
    });
  }

  updateUser(user) {
    const { userId } = user;

    return User.update(user, {
      returning: true,
      where: {
        id: userId,
      },
    });
  }

  getUserById(userId) {
    return User.findOne({
      where: {
        id: userId,
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

  getUserRoleStatistic() {
    return User.findAll({
      attributes: [
        'role',
        [sequelize.fn('COUNT', sequelize.col('role')), 'count'],
      ],
      group: 'role',
    });
  }

  getUserExpressionsStatisticByUser() {
    return UserExpression.findAll({
      attributes: [
        'userId',
        [sequelize.fn('COUNT', sequelize.col('userId')), 'count'],
      ],
      group: 'userId',
    });
  }
}

export default new UserRepository();
