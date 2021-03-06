'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'ExpressionTable',
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        value: {
          type: Sequelize.STRING,
          unique: 'uniqueExpressionValue',
        },
      },
      {
        uniqueKeys: {
          uniqueExpressionValue: {
            customIndex: true,
            fields: ['value'],
          },
        },
      },
    );
  },
  down: (queryInterface) => {
    return queryInterface.dropTable('ExpressionTable');
  },
};
