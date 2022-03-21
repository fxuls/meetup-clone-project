'use strict';
const {
  Model
} = require('sequelize');
const { User, Group } = require(".");
module.exports = (sequelize, DataTypes) => {
  class Member extends Model {
    static associate(models) {}
  }
  Member.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: User },
    },
    groupId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: Group },
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "member",
    }
  }, {
    sequelize,
    modelName: 'Member',
  });
  return Member;
};
