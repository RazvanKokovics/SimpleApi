'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('UsersTable', 'role', {
      type: Sequelize.INTEGER,
      defaultValue: 2,
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('UsersTable', 'role');
  },
};
