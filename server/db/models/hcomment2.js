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
  class Hcomment2 extends Model {
    static associate({ House, User }) {
      this.belongsTo(House, { foreignKey: 'house_id' });
      this.belongsTo(User, { foreignKey: 'user_id' });
    }
  }
  Hcomment2.init({
    house_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'Houses',
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
    modelName: 'Hcomment2',
  });
  return Hcomment2;
};
