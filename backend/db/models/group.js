'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Group extends Model {
    static associate(models) {
      Group.hasMany(models.Event, { foreignKey: "groupId" });
      Group.belongsTo(models.User, { foreignKey: "organizerId", as: "Organizer" });
      Group.hasMany(models.Venue, { foreignKey: "groupId" });
      Group.belongsTo(models.Image, { foreignKey: "previewImageId", as: "PreviewImage" });

      Group.belongsToMany(models.User, {
        through: "Members",
        foreignKey: "groupId",
      });

      Group.belongsToMany(models.Image, {
        through: "GroupImages",
        as: "Images",
        foreignKey: "groupId",
      });
    }
  }
  Group.init({
    organizerId: {
      allowNull: false,
      type: DataTypes.INTEGER,
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
      type: DataTypes.ENUM('inperson', 'virtual'),
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
  }, {
    sequelize,
    modelName: 'Group',
  });
  return Group;
};
