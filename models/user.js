'use strict';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      firstName: {
        type: DataTypes.STRING,
        validate: {
          len: {
            args: 3,
            msg: 'FirstName must be at least 3 characters.',
          },
        },
      },
      lastName: {
        type: DataTypes.STRING,
        validate: {
          len: {
            args: 3,
            msg: 'LastName must be at least 3 characters.',
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        validate: {
          isEmail: {
            args: true,
            msg: 'Email address is not valid.',
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        validate: {
          len: {
            args: 5,
            msg: 'Password must be at least 5 characters.',
          },
        },
      },
      userName: {
        type: DataTypes.STRING,
        validate: {
          len: {
            args: 5,
            msg: 'UserName must be at least 5 characters.',
          },
        },
      },
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
