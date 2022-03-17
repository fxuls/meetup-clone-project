'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Group extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Group.hasMany(models.Event, { foreignKey: "group_id" });
      Group.belongsTo(models.User, { foreignKey: "organizer_id" });
      Group.hasMany(models.Venue, { foreignKey: "group_id" });
      Group.hasOne(models.Image, { foreignKey: "preview_image_id" });
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
      type: Sequelize.ENUM('inperson', 'virtual'),
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
