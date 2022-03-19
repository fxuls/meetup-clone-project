"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Members",
      [
        { user_id: 1, group_id: 1 },
        { user_id: 1, group_id: 2 },
        { user_id: 1, group_id: 3 },
        { user_id: 2, group_id: 3 },
        { user_id: 3, group_id: 2 },
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
