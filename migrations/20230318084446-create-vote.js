'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Votes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER
      },
      candidateId: {
        type: Sequelize.INTEGER
      },
      categoryId: {
        type: Sequelize.INTEGER
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }, {
      paranoid: true
    });
     await queryInterface.addIndex('Votes', ['categoryId']);
     await queryInterface.addIndex('Votes', ['userId']);
     await queryInterface.addIndex('Votes', ['candidateId']);
  },
  async down(queryInterface, Sequelize) {
     await queryInterface.removeIndex('Votes', ['categoryId']);
     await queryInterface.removeIndex('Votes', ['userId']);
     await queryInterface.removeIndex('Votes', ['candidateId']);
    await queryInterface.dropTable('Votes');
  }
};