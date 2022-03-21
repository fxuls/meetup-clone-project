'use strict';
const {
  Model
} = require('sequelize');
const { Event, Image } = require(".");
module.exports = (sequelize, DataTypes) => {
  class EventImage extends Model {
    static associate(models) {}
  }
  EventImage.init({
    imageId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: Image },
    },
    eventId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: Event },
    }
  }, {
    sequelize,
    modelName: 'EventImage',
  });
  return EventImage;
};
