'use strict';

module.exports = (sequelize, DataTypes) => {
  const Expression = sequelize.define(
    'Expression',
    {
      value: DataTypes.STRING,
    },
    {
      timestamps: false,
      tableName: 'ExpressionTable',
      indexes: [
        {
          unique: true,
          fields: ['value'],
        },
      ],
    },
  );
  Expression.associate = function (models) {
    Expression.belongsToMany(models.User, {
      through: 'UserExpression',
      foreignKey: 'expressionId',
    });
  };
  return Expression;
};
