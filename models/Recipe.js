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
    image: {
      type: DataTypes.STRING,
      allownull: true,
    },
    dishName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    summary: {
      type: DataTypes.STRING,
      allownull: false,
    },
    instructions: {
      type: DataTypes.TEXT,
      allownull: false,
    },
    ingredients: {
      type: DataTypes.TEXT,
      allownull: false,
    },
    serves: {
      type: DataTypes.INTEGER,
      allownull: false,
    },
    prepTime: {
      type: DataTypes.INTEGER,
      allownull: true,
    },
    cookTime: {
      type: DataTypes.INTEGER,
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
    cuisine_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'cuisine',
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
