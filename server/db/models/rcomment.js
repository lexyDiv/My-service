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
  class Rcomment extends Model {
    static associate({ Rent, User }) {
      this.belongsTo(Rent, { foreignKey: 'rent_id' });
      this.belongsTo(User, { foreignKey: 'user_id' });
    }
  }
  Rcomment.init({
    rent_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'Rents',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    user_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    date: {
      allowNull: false,
      type: DataTypes.TEXT,
    },
    value: {
      allowNull: false,
      type: DataTypes.TEXT,
    },
  }, {
    sequelize,
    modelName: 'Rcomment',
  });
  return Rcomment;
};
