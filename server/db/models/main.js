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
  class Main extends Model {
    static associate(models) {
      // define association here
    }
  }
  Main.init({
    video: {
      type: DataTypes.TEXT,
    },
    video2: {
      type: DataTypes.TEXT,
    },
    video3: {
      type: DataTypes.TEXT,
    },
    video4: {
      type: DataTypes.TEXT,
    },
    image: {
      type: DataTypes.TEXT,
    },
    image2: {
      type: DataTypes.TEXT,
    },
    image3: {
      type: DataTypes.TEXT,
    },
    image4: {
      type: DataTypes.TEXT,
    },
    value: {
      type: DataTypes.TEXT,
    },
    value2: {
      type: DataTypes.TEXT,
    },
    value3: {
      type: DataTypes.TEXT,
    },
    value4: {
      type: DataTypes.TEXT,
    },
    data: {
      type: DataTypes.TEXT,
    },
  }, {
    sequelize,
    modelName: 'Main',
  });
  return Main;
};
