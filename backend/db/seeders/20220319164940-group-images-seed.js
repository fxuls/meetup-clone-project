'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "GroupImages",
      [
        { group_id: 1, image_id: 1 },
        { group_id: 1, image_id: 2 },
        { group_id: 2, image_id: 1 },
        { group_id: 2, image_id: 3 },
        { group_id: 3, image_id: 3 },
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
