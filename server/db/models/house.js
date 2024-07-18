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
  class House extends Model {
    static associate({ Location, Hcomment2 }) {
      this.belongsTo(Location, { foreignKey: 'location_id' });
      this.hasMany(Hcomment2, { foreignKey: 'house_id' });
    }
  }
  House.init({
    location_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'Locations',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    address: {
      type: DataTypes.TEXT,
    },
    name: {
      type: DataTypes.TEXT,
    },
    image: {
      type: DataTypes.TEXT,
    },
    images: {
      type: DataTypes.TEXT,
    },
    status: {
      type: DataTypes.TEXT,
    },
  }, {
    sequelize,
    modelName: 'House',
  });
  return House;
};
