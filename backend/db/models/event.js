"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    static associate(models) {
      Event.belongsTo(models.Group, { foreignKey: "group_id" });
      Event.hasOne(models.Image, { foreignKey: "preview_image_id" });
      Event.belongsTo(models.Venue, { foreignKey: "venue_id" });
    }
  }
  Event.init(
    {
      group_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      venue_id: {
        type: DataTypes.INTEGER,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
      },
      type: {
        type: DataTypes.ENUM("inperson", "virtual"),
        allowNull: false,
      },
      capacity: {
        type: DataTypes.INTEGER,
      },
      price: {
        type: DataTypes.DECIMAL,
      },
      start_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      end_date: {
        type: DataTypes.DATE,
      },
      num_attending: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      preview_image_id: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "Event",
    }
  );
  return Event;
};
