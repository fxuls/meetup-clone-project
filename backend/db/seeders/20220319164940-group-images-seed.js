'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "GroupImages",
      [
        { groupId: 1, imageId: 1 },
        { groupId: 1, imageId: 2 },
        { groupId: 2, imageId: 1 },
        { groupId: 2, imageId: 3 },
        { groupId: 3, imageId: 3 },
      ],
      {}
    );
  },

  async down (queryInterface, Sequelize) {
    queryInterface.bulkDelete("GroupImages", null, {
      truncate: true,
      cascade: true,
      restartIdentity: true,
    });
  }
};
