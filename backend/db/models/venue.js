'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Venue extends Model {
    static associate(models) {
      Venue.belongsTo(models.Group, { foreignKey: "group_id" });
      Venue.hasMany(models.Event, { foreignKey: "venue_id" });
    }
  }
  Venue.init({
    group_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
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
      type: DataTypes.DECIMAL(6,5),
      allowNull: false,
    },
    lng: {
      type: DataTypes.DECIMAL(6,5),
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'Venue',
  });
  return Venue;
};
