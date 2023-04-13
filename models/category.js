'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Category.hasMany(models.Candidate, {
        foreignKey: 'categoryId', // the name of the foreign key column in the Candidate table
        as: 'candidates' // the name of the association, used to retrieve associated Candidate records
      });
    }
  }
  Category.init({
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    maxVotes: DataTypes.STRING,
    priority: DataTypes.STRING
  }, {
    sequelize,
    paranoid: true,
    modelName: 'Category',
  });
  return Category;
};