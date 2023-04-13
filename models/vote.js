'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Vote extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
       Vote.belongsTo(models.Candidate, { foreignKey: 'candidateId' });
       Vote.belongsTo(models.Category, { foreignKey: 'categoryId' });
    }
  }
  Vote.init({
    userId: DataTypes.INTEGER,
    candidateId: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER
  }, {
    sequelize,
    paranoid: true,
    modelName: 'Vote',
     indexes: [
      {
        unique: false,
        fields: ['userId','candidateId','categoryId'],
      },
    ],
  });
  return Vote;
};