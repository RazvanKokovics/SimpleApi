import Sequelize from 'sequelize';

module.exports = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'postgres',

    pool: {
      max: 5,
      min: 0,
      idle: 10000,
    },
  },
);
