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
    static associate({ Client, Location, House }) {
      this.belongsTo(Client, { foreignKey: 'client_id' });
      this.belongsTo(Location, { foreignKey: 'location_id' });
      this.belongsTo(House, { foreignKey: 'house_id' });
    }
  }
  Application.init({
    client_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Clients',
        key: 'id'
      }
    },
    house_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Houses',
        key: 'id'
      }
    },
    location_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Locations',
        key: 'id'
      }
    },
    data: {
      type: DataTypes.TEXT,
    },
    date: {
      type: DataTypes.TEXT,
    },
    value: {
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
    type: {
      allowNull: false,
      type: DataTypes.TEXT,
    },
    status: {
      type: DataTypes.TEXT,
    },
    days: {
      allowNull: false,
      type: DataTypes.TEXT,
    },
  }, {
    sequelize,
    modelName: 'Application',
  });
  return Application;
};
