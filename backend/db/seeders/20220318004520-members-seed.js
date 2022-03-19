"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Members",
      [
        { userId: 1, groupId: 1 },
        { userId: 1, groupId: 2 },
        { userId: 1, groupId: 3 },
        { userId: 2, groupId: 3 },
        { userId: 3, groupId: 2 },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    queryInterface.bulkDelete("Members", null, {
      truncate: true,
      cascade: true,
      restartIdentity: true,
    });
  },
};
