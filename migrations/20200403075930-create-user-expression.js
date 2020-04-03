'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'UserExpressions',
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        userId: {
          type: Sequelize.INTEGER,
        },
        expressionId: {
          type: Sequelize.INTEGER,
        },
      },
      {
        timestamps: false,
      },
    );
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('UserExpressions');
  },
};
