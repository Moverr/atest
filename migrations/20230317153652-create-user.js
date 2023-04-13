'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      fullName: {
        allowNull: true,
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING,
        unique: true
      },
      image: {
        allowNull: true,
        type: Sequelize.STRING
      },
      countryId: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      phone: {
        allowNull: true,
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      status: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      userType: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
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

    // Add indexes to the table
    await queryInterface.addIndex('Users', ['email']);
    await queryInterface.addIndex('Users', ['countryId']);
    await queryInterface.addIndex('Users', ['password']);
    await queryInterface.addIndex('Users', ['status']);
    await queryInterface.addIndex('Users', ['isActive']);
  },
  async down(queryInterface, Sequelize) {
    // Remove indexes and drop the table
    await queryInterface.removeIndex('Users', ['email']);
    await queryInterface.removeIndex('Users', ['countryId']);
    await queryInterface.removeIndex('Users', ['password']);
    await queryInterface.removeIndex('Users', ['status']);
    await queryInterface.removeIndex('Users', ['isActive']);
    await queryInterface.dropTable('Users');
  }
};
