"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    static associate(models) {
      Event.belongsTo(models.Group, { foreignKey: "groupId" });
      Event.belongsTo(models.Image, { foreignKey: "previewImageId", as: "previewImage" });
      Event.belongsTo(models.Venue, { foreignKey: "venueId" });

      Event.belongsToMany(models.User, {
        through: "Attendee",
        foreignKey: "eventId",
        // onDelete: "cascade",
        // hooks: true,
      });

      Event.belongsToMany(models.Image, {
        through: "EventImage",
        as: "eventImages",
        foreignKey: "eventId",
      });
    }
  }
  Event.init(
    {
      groupId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "Groups" },
      },
      venueId: {
        type: DataTypes.INTEGER,
        references: { model: "Venues" },
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
        references: { model: "Images" },
      },
    },
    {
      sequelize,
      modelName: "Event",
    }
  );
  return Event;
};
