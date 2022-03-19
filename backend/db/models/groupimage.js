'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class GroupImage extends Model {
    static associate(models) { }
  }
  GroupImage.init({
    imageId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    groupId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'GroupImage',
  });
  return GroupImage;
};
