'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "EventImages",
      [
        { eventId: 1, imageId: 6 },
        { eventId: 1, imageId: 7 },
        { eventId: 2, imageId: 8 },
        { eventId: 2, imageId: 9 },
        { eventId: 3, imageId: 10 },
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
