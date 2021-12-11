import { QueryInterface, DataTypes } from 'sequelize';

module.exports = {
  // tslint:disable-next-line:variable-name
  up: async (queryInterface: QueryInterface) => {
    return Promise.all([
      queryInterface.createTable('QuestionTypes', {
        id: {
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
          type: DataTypes.INTEGER,
        },
        name: {
          allowNull: false,
          unique: true,
          type: DataTypes.STRING,
        },
        inputSchema: {
          allowNull: false,
          type: DataTypes.JSON,
        },
        outputSchema: {
          allowNull: false,
          type: DataTypes.JSON,
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
    return Promise.all([queryInterface.dropTable('QuestionTypes')]);
  },
};
