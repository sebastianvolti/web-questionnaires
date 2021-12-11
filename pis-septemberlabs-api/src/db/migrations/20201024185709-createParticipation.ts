import { QueryInterface, DataTypes } from 'sequelize';

module.exports = {
  // tslint:disable-next-line:variable-name
  up: async (queryInterface: QueryInterface) => {
    return Promise.all([
      queryInterface.createTable('Participations', {
        id: {
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
          type: DataTypes.INTEGER,
        },
        userId: {
          allowNull: false,
          type: DataTypes.STRING,
          references: {
            model: 'Users',
            key: 'id',
          },
        },
        surveyId: {
          allowNull: false,
          type: DataTypes.INTEGER,
          references: {
            model: 'Surveys',
            key: 'id',
          },
        },
        createdAt: {
          allowNull: false,
          type: DataTypes.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: DataTypes.DATE,
        },
        deletedAt: {
          allowNull: true,
          type: DataTypes.DATE,
        },
      }),
    ]);
  },

  // tslint:disable-next-line:variable-name
  down: async (queryInterface: QueryInterface) => {
    return Promise.all([queryInterface.dropTable('Participations')]);
  },
};
