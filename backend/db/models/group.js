'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Group extends Model {
    static associate(models) {
      Group.hasMany(models.Event, { foreignKey: "group_id" });
      Group.belongsTo(models.User, { foreignKey: "organizer_id" });
      Group.hasMany(models.Venue, { foreignKey: "group_id" });
      Group.hasOne(models.Image, { foreignKey: "preview_image_id" });

      Group.belongsToMany(models.User, {
        through: "Members",
        foreignKey: "group_id",
      });

      Group.belongsToMany(models.Image, {
        through: "GroupImages",
        as: "Images",
        foreignKey: "group_id",
      });
    }
  }
  Group.init({
    organizer_id: {
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
    preview_image_id: {
      type: DataTypes.INTEGER,
    },
    city: {
      type: DataTypes.STRING,
    },
    state: {
      type: DataTypes.STRING,
    },
    num_members: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  }, {
    sequelize,
    modelName: 'Group',
  });
  return Group;
};
