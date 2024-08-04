'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Wall extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Wall.init({
    client_id: DataTypes.INTEGER,
    value: DataTypes.TEXT,
    date: DataTypes.TEXT,
    data: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Wall',
  });
  return Wall;
};