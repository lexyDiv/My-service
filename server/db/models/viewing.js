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
  class Viewing extends Model {
    static associate({ User, Message }) {
      this.belongsTo(User, { foreignKey: 'user_id' });
      this.belongsTo(Message, { foreignKey: 'message_id' });
    }
  }
  Viewing.init({
    message_id: {
      allowNull: false,
      type: DataTypes.BIGINT,
      references: {
        model: 'Messages',
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
      type: DataTypes.BIGINT,
    },
  }, {
    sequelize,
    modelName: 'Viewing',
  });
  return Viewing;
};
