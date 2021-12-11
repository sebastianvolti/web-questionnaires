"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = {
    // tslint:disable-next-line:variable-name
    up: async (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.createTable("Users", {
                id: {
                    allowNull: false,
                    primaryKey: true,
                    type: Sequelize.STRING,
                },
                name: {
                    type: Sequelize.STRING,
                },
                lastName: {
                    type: Sequelize.STRING,
                },
                email: {
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
                deletionDate: {
                    allowNull: true,
                    type: Sequelize.DATE,
                },
            }),
        ]);
    },
    // tslint:disable-next-line:variable-name
    down: async (queryInterface, Sequelize) => {
        return Promise.all([queryInterface.dropTable("Users")]);
    },
};
