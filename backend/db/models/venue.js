"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Venue extends Model {
    static associate(models) {
      Venue.belongsTo(models.Group, { foreignKey: "groupId" });
      Venue.hasMany(models.Event, { foreignKey: "venueId" });
    }
  }
  Venue.init(
    {
      groupId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "Groups" },
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      state: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lat: {
        type: DataTypes.DECIMAL(6, 5),
        allowNull: false,
      },
      lng: {
        type: DataTypes.DECIMAL(6, 5),
        allowNull: false,
      },
    },
    {
      defaultScope: {
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      },
      scopes: {
        simple: {
          attributes: ["id", "city", "state"],
        },
        excludeGroupId: {
          attributes: {
            exclude: ["groupId", "createdAt", "updatedAt"],
          },
        },
      },
      sequelize,
      modelName: "Venue",
    }
  );
  return Venue;
};
