'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'EquationsTable',
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        value: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: 'uniqueValue',
        },
        solution: {
          type: Sequelize.STRING,
          allowNull: false,
        },
      },
      {
        uniqueKeys: {
          uniqueValue: {
            customIndex: true,
            fields: ['value'],
          },
        },
      },
    );
  },
  down: (queryInterface) => {
    return queryInterface.dropTable('EquationsTable');
  },
};
