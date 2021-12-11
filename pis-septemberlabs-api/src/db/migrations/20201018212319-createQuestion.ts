import { QueryInterface, DataTypes } from 'sequelize';

module.exports = {
  // tslint:disable-next-line:variable-name
  up: async (queryInterface: QueryInterface) => {
    return Promise.all([
      queryInterface.createTable('Questions', {
        id: {
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
          type: DataTypes.INTEGER,
        },
        questionTypeId: {
          allowNull: false,
          type: DataTypes.INTEGER,
          references: {
            model: 'QuestionTypes',
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
          onUpdate: 'cascade',
          onDelete: 'cascade',
        },
        description: {
          allowNull: false,
          type: DataTypes.STRING,
        },
        required: {
          allowNull: false,
          defaultValue: false,
          type: DataTypes.BOOLEAN,
        },
        parameters: {
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
    return Promise.all([queryInterface.dropTable('Questions')]);
  },
};
