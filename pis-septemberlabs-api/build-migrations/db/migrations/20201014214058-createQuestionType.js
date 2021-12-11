"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = {
    // tslint:disable-next-line:variable-name
    up: async (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.createTable('QuestionTypes', {
                id: {
                    allowNull: false,
                    primaryKey: true,
                    type: Sequelize.STRING,
                },
                name: {
                    allowNull: false,
                    unique: true,
                    type: Sequelize.STRING,
                },
                inputSchema: {
                    allowNull: false,
                    type: Sequelize.JSON,
                },
                outputSchema: {
                    allowNull: false,
                    type: Sequelize.JSON,
                },
                createdAt: {
                    allowNull: false,
                    type: Sequelize.DATE,
                },
                updatedAt: {
                    allowNull: false,
                    type: Sequelize.DATE,
                },
                deletedAt: {
                    allowNull: true,
                    type: Sequelize.DATE,
                },
            }),
        ]);
    },
    // tslint:disable-next-line:variable-name
    down: async (queryInterface) => {
        return Promise.all([queryInterface.dropTable('QuestionTypes')]);
    },
};
