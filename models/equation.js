'use strict';
module.exports = (sequelize, DataTypes) => {
  const Equation = sequelize.define(
    'Equation',
    {
      value: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: 'The value of the equation cannot be null.',
          },
        },
      },
      solution: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: 'The value of the solution cannot be null.',
          },
          isNumeric: {
            args: true,
            msg: 'The value of the solution can be only numeric.',
          },
        },
      },
    },
    {
      timestamps: false,
      tableName: 'EquationsTable',
    },
  );
  return Equation;
};
