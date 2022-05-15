"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Group extends Model {
    static associate(models) {
      Group.hasMany(models.Event, {
        foreignKey: "groupId",
      });
      Group.hasMany(models.Venue, {
        foreignKey: "groupId",
      });

      Group.belongsTo(models.User, {
        foreignKey: "organizerId",
        as: "Organizer",
      });
      Group.belongsTo(models.Image, {
        foreignKey: "previewImageId",
        as: "previewImage",
      });

      Group.belongsToMany(models.User, {
        through: "Member",
        foreignKey: "groupId",
        as: "members"
      });

      Group.belongsToMany(models.Image, {
        through: "GroupImage",
        as: "groupImages",
        foreignKey: "groupId",
      });
    }
  }
  Group.init(
    {
      organizerId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: { model: "Users" },
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      about: {
        type: DataTypes.TEXT,
      },
      type: {
        allowNull: false,
        type: DataTypes.ENUM("inperson", "virtual"),
      },
      private: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
      },
      previewImageId: {
        type: DataTypes.INTEGER,
        references: { model: "Images" },
      },
      city: {
        type: DataTypes.STRING,
      },
      state: {
        type: DataTypes.STRING,
      },
      numMembers: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
    },
    {
      scopes: {
        simple: {
          attributes: ["name", "city", "state", "private"]
        },
        private: {
          attributes: ["private"]
        }
      },
      sequelize,
      modelName: "Group",
    }
  );
  return Group;
};
