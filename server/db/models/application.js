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
    static associate({ Client, House, Location }) {
      this.belongsTo(Client, { foreignKey: 'client_id' });
      this.belongsTo(House, { foreignKey: 'house_id' });
      this.belongsTo(Location, { foreignKey: 'location_id' });
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
    },
    location_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'Locations',
        key: 'id',
      },
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
    value: {
      type: DataTypes.TEXT,
    },
    value2: {
      type: DataTypes.TEXT,
    },
    check: {
      type: DataTypes.BOOLEAN,
    },
  }, {
    sequelize,
    modelName: 'Application',
  });
  return Application;
};
