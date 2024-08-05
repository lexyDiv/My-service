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
  class Wall extends Model {
    static associate({ Client }) {
      this.belongsTo(Client, { foreignKey: 'client_id' });
    }
  }
  Wall.init({
    client_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'Clients',
        key: 'id'
      }
    },
    value: {
      allowNull: false,
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
    modelName: 'Wall',
  });
  return Wall;
};
