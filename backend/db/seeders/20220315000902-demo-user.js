"use strict";
const bcrypt = require("bcryptjs");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          firstName: "Test",
          lastName: "User",
          email: "testuser@gmail.com",
          passwordHash: bcrypt.hashSync("password"),
        },
        {
          firstName: "Mary",
          lastName: "Steele",
          email: "msteele@gmail.com",
          passwordHash: bcrypt.hashSync("asdfwow"),
        },
        {
          firstName: "Ethan",
          lastName: "Moore",
          email: "emoore@gmail.com",
          passwordHash: bcrypt.hashSync("paswurd"),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    queryInterface.bulkDelete('Users', null, {
      truncate: true,
      cascade: true,
      restartIdentity: true,
    });
  },
};
