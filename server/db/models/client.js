'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Client extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Client.init({
    login: DataTypes.TEXT,
    password: DataTypes.TEXT,
    name: DataTypes.TEXT,
    email: DataTypes.TEXT,
    tele: DataTypes.TEXT,
    phone: DataTypes.TEXT,
    image: DataTypes.TEXT,
    date: DataTypes.TEXT,
    data: DataTypes.TEXT,
    user_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Client',
  });
  return Client;
};