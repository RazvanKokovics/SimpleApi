'use strict';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      userName: DataTypes.STRING,
    },
    { timestamps: false, tableName: 'UsersTable' },
  );
  return User;
};
