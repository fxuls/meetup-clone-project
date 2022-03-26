'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    static associate(models) {
      Image.hasMany(models.Group, { foreignKey: "previewImageId" });
      Image.hasMany(models.Event, { foreignKey: "previewImageId" });
      Image.belongsTo(models.User, { foreignKey: "ownerId" });

      Image.belongsToMany(models.Group, {
        through: "GroupImage",
        foreignKey: "imageId",
      });

      Image.belongsToMany(models.Event, {
        through: "EventImage",
        foreignKey: "imageId",
      });
    }
  }
  Image.init({
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ownerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'Image',
  });
  return Image;
};
