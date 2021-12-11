import { QueryInterface, DataTypes } from 'sequelize';

module.exports = {
  // tslint:disable-next-line:variable-name
  up: async (queryInterface: QueryInterface) => {
    queryInterface.addColumn('Users', 'role', {
      type: DataTypes.STRING,
      defaultValue: 'user',
    });
  },

  // tslint:disable-next-line:variable-name
  down: async (queryInterface: QueryInterface) => {
    queryInterface.removeColumn('Users', 'role');
  },
};
