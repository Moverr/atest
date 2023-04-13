'use strict';

const argon2 = require('argon2');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const hashedPassword = await argon2.hash('adminvision!!');

    const users = [
      {
        fullName: 'New Vision Admin',
        email: 'admin@newvision.com',
        image: 'default.png',
        countryId: 1,
        phone: "0701512709",
        password: hashedPassword,
        isActive: true,
        userType: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ];

    return queryInterface.bulkInsert('Users', users, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
