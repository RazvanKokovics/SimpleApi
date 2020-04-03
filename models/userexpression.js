'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserExpression = sequelize.define(
    'UserExpression',
    {
      userId: DataTypes.INTEGER,
      expressionId: DataTypes.INTEGER,
    },
    { timestamps: false },
  );
  UserExpression.associate = function (models) {
    // associations can be defined here
  };
  return UserExpression;
};
