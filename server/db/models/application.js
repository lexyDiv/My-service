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
  class Application extends Model {
    static associate({ Client, House }) {
      this.belongsTo(Client, { foreignKey: 'client_id' });
      this.belongsTo(House, { foreignKey: 'house_id' });
    }
  }
  Application.init({
    client_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'Clients',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    house_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'Houses',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    date: {
      allowNull: false,
      type: DataTypes.TEXT,
    },
    data: {
      type: DataTypes.TEXT,
    },
    startTime: {
      allowNull: false,
      type: DataTypes.BIGINT,
    },
    endTime: {
      allowNull: false,
      type: DataTypes.BIGINT,
    },
    days: {
      type: DataTypes.TEXT,
    },
  }, {
    sequelize,
    modelName: 'Application',
  });
  return Application;
};
