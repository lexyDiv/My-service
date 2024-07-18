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
  class Location extends Model {
    static associate({ LComment, House }) {
      this.hasMany(LComment, { foreignKey: 'location_id' });
      this.hasMany(House, { foreignKey: 'location_id' });
    }
  }
  Location.init({
    name: {
      type: DataTypes.TEXT,
    },
    address: {
      type: DataTypes.TEXT,
    },
    description: {
      type: DataTypes.TEXT,
    },
    image: {
      type: DataTypes.TEXT,
    },
    images: {
      type: DataTypes.TEXT,
    },
    status: {
      allowNull: false,
      type: DataTypes.TEXT,
    },
    type: {
      allowNull: false,
      type: DataTypes.TEXT,
    },
    data: {
      type: DataTypes.TEXT,
    },
  }, {
    sequelize,
    modelName: 'Location',
  });
  return Location;
};
