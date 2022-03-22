"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Attendee extends Model {
    static associate(models) {

    }
  }
  Attendee.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "Users" },
      },
      eventId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "Events" },
      },
    },
    {
      sequelize,
      modelName: "Attendee",
    }
  );
  return Attendee;
};
