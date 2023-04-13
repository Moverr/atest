'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
 
    }
  };
  User.init({
    fullName: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    image: DataTypes.STRING,
    countryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    phone: DataTypes.STRING,
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    userType: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false,
    },
  }, {
    sequelize,
    paranoid: true,
    modelName: 'User',
    indexes: [
      {
        unique: false,
        fields: ['countryId', 'password', 'status', 'isActive'],
      },
    ],
  });


  return User;
};
