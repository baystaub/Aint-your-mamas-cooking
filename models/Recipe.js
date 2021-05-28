const { stringify } = require('querystring');
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Recipes extends Model {}

Recipes.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    Image: {
      type: DataTypes.STRING,
      allownull: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    summary: {
      type: DataTypes.STRING,
      allownull: false,
    },
    instructions: {
      type: DataTypes.STRING,
      allownull: false,
    },
    ingredients: {
      type: DataTypes.STRING,
      allownull: false,
    },
    serves: {
      type: DataTypes.INTEGER,
      allownull: false,
    },
    prepTime: {
      type: DataTypes.STRING,
      allownull: true,
    },
    cookTime: {
      type: DataTypes.INTEGER,
      allownull: true,
    },
    cuisineType: {
      type: DataTypes.STRING,
      allownull: true,
    },
    date_created: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'recipe',
  }
);

module.exports = Recipes;
