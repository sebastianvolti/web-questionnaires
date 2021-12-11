import { QueryInterface, DataTypes } from 'sequelize';

module.exports = {
  // tslint:disable-next-line:variable-name
  up: async (queryInterface: QueryInterface) => {
    queryInterface.addColumn('Participations', 'status', {
      type: DataTypes.STRING,
      defaultValue: 'started',
    });
  },

  // tslint:disable-next-line:variable-name
  down: async (queryInterface: QueryInterface) => {
    queryInterface.removeColumn('Participations', 'status');
  },
};
