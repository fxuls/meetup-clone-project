'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Member extends Model {
    static associate(models) {}
  }
  Member.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "Users" },
    },
    groupId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "Groups" },
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
