'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Candidate extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Candidate.belongsTo(models.Category, { foreignKey: 'categoryId' });
      Candidate.hasMany(models.Vote, { foreignKey: 'candidateId' });
    }
  }
  Candidate.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.TEXT,
    photo: DataTypes.STRING,
    categoryId: DataTypes.INTEGER
  }, {
    sequelize,
    paranoid: true,
    modelName: 'Candidate',
      indexes: [
      {
        unique: false,
        fields: ['categoryId'],
      },
    ],
  });
  return Candidate;
};