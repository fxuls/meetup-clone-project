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
    },
    groupId: {
      type: DataTypes.INTEGER,
      allowNull: false,
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
