"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class EventImage extends Model {
    static associate(models) {
      EventImage.belongsTo(models.Image, { foreignKey: "imageId" });
    }
  }
  EventImage.init(
    {
      imageId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "Images" },
      },
      eventId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "Events" },
      },
    },
    {
      sequelize,
      modelName: "EventImage",
    }
  );
  return EventImage;
};
