import { QueryInterface, DataTypes } from 'sequelize';

module.exports = {
  // tslint:disable-next-line:variable-name
  up: async (queryInterface: QueryInterface) => {
    return Promise.all([
      queryInterface.createTable('Answers', {
        id: {
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
          type: DataTypes.INTEGER,
        },
        participationId: {
          allowNull: false,
          type: DataTypes.INTEGER,
          references: {
            model: 'Participations',
            key: 'id',
          },
        },
        questionId: {
          allowNull: false,
          type: DataTypes.INTEGER,
          references: {
            model: 'Questions',
            key: 'id',
          },
          onUpdate: 'cascade',
          onDelete: 'cascade',
        },
        answer: {
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
    return Promise.all([queryInterface.dropTable('Answers')]);
  },
};
