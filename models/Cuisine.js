const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Cuisine extends Model {}

Cuisine.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allownull: true,
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'cuisine',
  }
);

module.exports = Cuisine;
