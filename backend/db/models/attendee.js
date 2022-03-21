"use strict";
const { Model } = require("sequelize");
const { User, Event } = require(".");
module.exports = (sequelize, DataTypes) => {
  class Attendee extends Model {
    static associate(models) {}
  }
  Attendee.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: User },
      },
      eventId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: Event },
      },
    },
    {
      sequelize,
      modelName: "Attendee",
    }
  );
  return Attendee;
};
