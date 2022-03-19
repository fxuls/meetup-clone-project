'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    static associate(models) {
      Image.belongsTo(models.Group, { foreignKey: "preview_image_id" });
      Image.belongsTo(models.Event, { foreignKey: "preview_image_id" });

      Image.belongsToMany(models.Group, {
        through: "GroupImages",
        foreignKey: "image_id",
      });

      Image.belongsToMany(models.Event, {
        through: "EventImages",
        foreignKey: "image_id",
      });
    }
  }
  Image.init({
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'Image',
  });
  return Image;
};
