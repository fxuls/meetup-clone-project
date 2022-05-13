"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Members",
      [
        { userId: 1, groupId: 1 },
        { userId: 2, groupId: 1 },
        { userId: 2, groupId: 2 },
        { userId: 3, groupId: 1 },
        { userId: 3, groupId: 3 },
        { userId: 4, groupId: 1 },
        { userId: 4, groupId: 2 },
        { userId: 4, groupId: 3 },
        { userId: 5, groupId: 1 },
        { userId: 6, groupId: 2 },
        { userId: 6, groupId: 3 },
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
