/* eslint-disable no-unused-vars */
/* eslint-disable comma-dangle */
/* eslint-disable import/newline-after-import */
/* eslint-disable strict */
/* eslint-disable lines-around-directive */
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Client extends Model {
    static associate({
      User, Personality, Wall, Feedback, Application
    }) {
      this.belongsTo(User, { foreignKey: 'user_id' });
      this.hasMany(Personality, { foreignKey: 'client_id' });
      this.hasMany(Wall, { foreignKey: 'client_id' });
      this.hasMany(Feedback, { foreignKey: 'client_id' });
      this.hasMany(Application, { foreignKey: 'client_id' });
    }
  }
  Client.init({
    login: {
      type: DataTypes.TEXT,
    },
    password: {
      type: DataTypes.TEXT,
    },
    name: {
      type: DataTypes.TEXT,
    },
    email: {
      type: DataTypes.TEXT,
    },
    tele: {
      type: DataTypes.TEXT,
    },
    phone: {
      type: DataTypes.TEXT,
    },
    image: {
      type: DataTypes.TEXT,
    },
    date: {
      type: DataTypes.TEXT,
    },
    data: {
      type: DataTypes.TEXT,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
  }, {
    sequelize,
    modelName: 'Client',
  });
  return Client;
};
