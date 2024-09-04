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
  class Post extends Model {
    static associate({ Location, House }) {
      this.belongsTo(Location, { foreignKey: 'location_id' });
      this.belongsTo(House, { foreignKey: 'house_id' });
    }
  }
  Post.init({
    value: {
      type: DataTypes.TEXT,
    },
    data: {
      type: DataTypes.TEXT,
    },
    date: {
      type: DataTypes.BIGINT,
    },
    location_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Locations',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    house_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Houses',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};
