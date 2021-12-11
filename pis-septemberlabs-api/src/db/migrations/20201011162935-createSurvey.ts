import { QueryInterface } from 'sequelize';

module.exports = {
  // tslint:disable-next-line:variable-name
  up: async (queryInterface: QueryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.createTable('Surveys', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        title: {
          type: Sequelize.STRING,
        },
        projectName: {
          type: Sequelize.STRING,
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        deletedAt: {
          allowNull: true,
          type: Sequelize.DATE,
        },
      }),
    ]);
  },

  // tslint:disable-next-line:variable-name
  down: async (queryInterface: QueryInterface, Sequelize) => {
    return Promise.all([queryInterface.dropTable('Surveys')]);
  },
};
