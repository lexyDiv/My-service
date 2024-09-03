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
    static associate({ User, Application, Rent }) {
      this.belongsTo(User, { foreignKey: 'user_id' });
      this.hasMany(Application, { foreignKey: 'client_id' });
      this.hasMany(Rent, { foreignKey: 'client_id' });
    }
  }
  Client.init({
    password: {
      type: DataTypes.TEXT,
    },
    login: {
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
    net: {
      type: DataTypes.TEXT,
    },
    image: {
      type: DataTypes.TEXT,
    },
    date: {
      type: DataTypes.TEXT,
    },
    about: {
      type: DataTypes.TEXT,
    },
    ban: {
      type: DataTypes.BOOLEAN,
    },
    regDate: {
      type: DataTypes.TEXT,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
    data: {
      type: DataTypes.TEXT,
    },
    birthday: {
      type: DataTypes.BIGINT,
    },
  }, {
    sequelize,
    modelName: 'Client',
  });
  return Client;
};
