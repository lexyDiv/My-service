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
  class Rent extends Model {
    static associate({ House, User, Rcomment }) {
      this.belongsTo(House, { foreignKey: 'house_id' });
      this.belongsTo(User, { foreignKey: 'user_id' });
      this.hasMany(Rcomment, { foreignKey: 'rent_id' });
    }
  }
  Rent.init({
    house_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'Houses',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    startDate: {
      allowNull: false,
      type: DataTypes.TEXT,
    },
    endDate: {
      allowNull: false,
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
    date: {
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
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    data: {
      type: DataTypes.TEXT,
    },
  }, {
    sequelize,
    modelName: 'Rent',
  });
  return Rent;
};
