import { QueryInterface, DataTypes } from 'sequelize';

module.exports = {
  // tslint:disable-next-line:variable-name
  up: async (queryInterface: QueryInterface) => {
    queryInterface.addColumn('Surveys', 'status', {
      type: DataTypes.STRING,
      defaultValue: 'draft',
    });
  },

  // tslint:disable-next-line:variable-name
  down: async (queryInterface: QueryInterface) => {
    queryInterface.removeColumn('Surveys', 'status');
  },
};
