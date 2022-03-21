'use strict';
const {
  Model
} = require('sequelize');
const { Image, Group } = require(".");
module.exports = (sequelize, DataTypes) => {
  class GroupImage extends Model {
    static associate(models) { }
  }
  GroupImage.init({
    imageId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: Image },
    },
    groupId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: Group },
    }
  }, {
    sequelize,
    modelName: 'GroupImage',
  });
  return GroupImage;
};
