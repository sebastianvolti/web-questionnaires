import { QueryInterface, DataTypes } from 'sequelize';

module.exports = {
  // tslint:disable-next-line:variable-name
  up: async (queryInterface: QueryInterface) => {
    queryInterface.addColumn('Surveys', 'startedAt', {
      type: DataTypes.DATE,
    });
    queryInterface.addColumn('Surveys', 'endedAt', {
      type: DataTypes.DATE,
    });
  },

  // tslint:disable-next-line:variable-name
  down: async (queryInterface: QueryInterface) => {
    queryInterface.removeColumn('Surveys', 'startedAt');
    queryInterface.removeColumn('Surveys', 'endedAt');
  },
};
