/* eslint-disable no-unused-vars */
/* eslint-disable comma-dangle */
/* eslint-disable strict */
/* eslint-disable import/newline-after-import */
/* eslint-disable lines-around-directive */
'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate({
      LComment, Rcomment, Hcomment2, Message, Rent, Client, Viewing
    }) {
      this.hasMany(LComment, { foreignKey: 'user_id' });
      this.hasMany(Rcomment, { foreignKey: 'user_id' });
      this.hasMany(Hcomment2, { foreignKey: 'user_id' });
      this.hasMany(Message, { foreignKey: 'user_id' });
      this.hasMany(Rent, { foreignKey: 'user_id' });
      this.hasMany(Client, { foreignKey: 'user_id' });
      this.hasMany(Viewing, { foreignKey: 'user_id' });
    }
  }
  User.init(
    {
      name: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      password: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      image: {
        type: DataTypes.TEXT,
      },
      level: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      email: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      phone: {
        type: DataTypes.TEXT,
      },
      tele: {
        type: DataTypes.TEXT,
      },
      net: {
        type: DataTypes.TEXT,
      },
      admin: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
      },
    },
    {
      sequelize,
      modelName: 'User',
    }
  );
  return User;
};
