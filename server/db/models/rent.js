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
    static associate({
      House, User, Rcomment, Client, Location
    }) {
      this.belongsTo(House, { foreignKey: 'house_id' });
      this.belongsTo(User, { foreignKey: 'user_id' });
      this.hasMany(Rcomment, { foreignKey: 'rent_id' });
      this.belongsTo(Client, { foreignKey: 'client_id' });
      this.belongsTo(Location, { foreignKey: 'location_id' });
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
    location_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'Locations',
        key: 'id',
      },
      onDelete: 'CASCADE',
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
    update_date: {
      allowNull: false,
      type: DataTypes.TEXT,
    },
    status: {
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
    client_id: {
      type: DataTypes.INTEGER,
    },
    data: {
      type: DataTypes.TEXT,
    },
    check: {
      type: DataTypes.BOOLEAN,
    },
    checkInfo: {
      type: DataTypes.TEXT,
    },
    checkSumm: {
      type: DataTypes.INTEGER,
    },
  }, {
    sequelize,
    modelName: 'Rent',
  });
  return Rent;
};
