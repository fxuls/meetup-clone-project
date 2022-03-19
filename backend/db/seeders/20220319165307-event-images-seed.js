'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "EventImages",
      [
        { eventId: 1, imageId: 1 },
        { eventId: 1, imageId: 2 },
        { eventId: 2, imageId: 1 },
        { eventId: 2, imageId: 3 },
        { eventId: 3, imageId: 3 },
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
