'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "EventImages",
      [
        { event_id: 1, image_id: 1 },
        { event_id: 1, image_id: 2 },
        { event_id: 2, image_id: 1 },
        { event_id: 2, image_id: 3 },
        { event_id: 3, image_id: 3 },
      ],
      {}
    );
  },

  async down (queryInterface, Sequelize) {
    queryInterface.bulkDelete("EventImages", null, {
      truncate: true,
      cascade: true,
      restartIdentity: true,
    });
  }
};
