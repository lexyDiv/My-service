/* eslint-disable no-unused-vars */
/* eslint-disable comma-dangle */
/* eslint-disable strict */
/* eslint-disable import/newline-after-import */
/* eslint-disable lines-around-directive */
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Viewing extends Model {
    static associate({ User }) {
      this.belongsTo(User, { foreignKey: 'user_id' });
    }
  }
  Viewing.init({
    user_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    message_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'Messages',
        key: 'id'
      },
      onDelete: 'CASCADE'
    },
  }, {
    sequelize,
    modelName: 'Viewing',
  });
  return Viewing;
};
