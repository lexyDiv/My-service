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
  class Personality extends Model {
    static associate({ User, Client }) {
      this.belongsTo(User, { foreignKey: 'user_id' });
      this.belongsTo(Client, { foreignKey: 'client_id' });
    }
  }
  Personality.init({
    client_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'Clients',
        key: 'id'
      }
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    value: {
      type: DataTypes.TEXT,
    },
    date: {
      allowNull: false,
      type: DataTypes.TEXT,
    },
    data: {
      type: DataTypes.TEXT,
    },
  }, {
    sequelize,
    modelName: 'Personality',
  });
  return Personality;
};
