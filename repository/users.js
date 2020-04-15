import sequelize from 'sequelize';

import { User } from '../models';

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

  getUserStatistic() {
    return User.findAll({
      attributes: [
        'role',
        [sequelize.fn('COUNT', sequelize.col('role')), 'count'],
      ],
      group: 'role',
    });
  }
}

export default new UserRepository();
