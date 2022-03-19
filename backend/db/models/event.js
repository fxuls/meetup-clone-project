"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    static associate(models) {
      Event.belongsTo(models.Group, { foreignKey: "groupId" });
      Event.hasOne(models.Image, { foreignKey: "previewImageId" });
      Event.belongsTo(models.Venue, { foreignKey: "venueId" });

      Event.belongsToMany(models.User, {
        through: "Attendees",
        foreignKey: "eventId",
      });

      Event.belongsToMany(models.Image, {
        through: "EventImages",
        as: "Images",
        foreignKey: "eventId",
      });
    }
  }
  Event.init(
    {
      groupId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      venueId: {
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
      startDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      endDate: {
        type: DataTypes.DATE,
      },
      numAttending: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      previewImageId: {
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
