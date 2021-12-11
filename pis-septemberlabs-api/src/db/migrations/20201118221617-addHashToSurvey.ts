import { QueryInterface, DataTypes } from 'sequelize';

module.exports = {
  // tslint:disable-next-line:variable-name
  up: async (queryInterface: QueryInterface) => {
    queryInterface.addColumn('Surveys', 'hash', {
      type: DataTypes.STRING,
    });
  },

  // tslint:disable-next-line:variable-name
  down: async (queryInterface: QueryInterface) => {
    queryInterface.removeColumn('Surveys', 'hash');
  },
};
