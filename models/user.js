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
    {
      timestamps: false,
      tableName: 'UsersTable',
      indexes: [
        {
          unique: true,
          fields: ['userName'],
        },
      ],
    },
  );
  User.associate = function (models) {
    User.belongsToMany(models.Expression, {
      through: 'UserExpression',
      foreignKey: 'userId',
    });
  };
  return User;
};
