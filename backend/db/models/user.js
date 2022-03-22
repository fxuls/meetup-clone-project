"use strict";
const bcrypt = require("bcryptjs");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Group, {
        foreignKey: "organizerId",
        // onDelete: "cascade",
        // hooks: true,
      });

      User.belongsToMany(models.Group, {
        through: "Member",
        as: "Memberships",
        foreignKey: "userId",
      });

      User.belongsToMany(models.Event, {
        through: "Attendee",
        as: "Attending",
        foreignKey: "userId",
      });
    }
  }
  User.init(
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1, 100],
        },
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1, 100],
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [3, 255],
        },
      },
      passwordHash: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [60, 60],
        },
      },
    },
    {
      defaultScope: {
        attributes: {
          exclude: ["passwordHash", "email", "createdAt", "updatedAt"],
        },
      },
      scopes: {
        currentUser: {
          attributes: { exclude: ["passwordHash"] },
        },
        loginUser: {
          attributes: {},
        },
      },
      sequelize,
      modelName: "User",
    }
  );

  User.prototype.toSafeObject = function () {
    const { id, username, email } = this; // context will be the User instance
    return { id, username, email };
  };

  User.prototype.validatePassword = function (password) {
    return bcrypt.compareSync(password, this.passwordHash.toString());
  };

  User.getCurrentUserById = async function (id) {
    return await User.scope("currentUser").findByPk(id);
  };

  User.login = async function ({ email, password }) {
    const { Op } = require("sequelize");
    const user = await User.scope("loginUser").findOne({
      where: {
        email: email,
      },
    });
    if (user && user.validatePassword(password)) {
      return await User.scope("currentUser").findByPk(user.id);
    }
  };

  User.signup = async function ({ firstName, lastName, email, password }) {
    const passwordHash = bcrypt.hashSync(password);
    const user = await User.create({
      firstName,
      lastName,
      email,
      passwordHash,
    });
    return await User.scope("currentUser").findByPk(user.id);
  };

  return User;
};
