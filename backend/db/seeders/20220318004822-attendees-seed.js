"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Attendees",
      [
        { userId: 1, eventId: 1 },
        { userId: 2, eventId: 1 },
        { userId: 2, eventId: 2 },
        { userId: 3, eventId: 4 },
        { userId: 3, eventId: 3 },
        { userId: 4, eventId: 3 },
        { userId: 4, eventId: 4 },
        { userId: 4, eventId: 5 },
        { userId: 5, eventId: 1 },
        { userId: 6, eventId: 4 },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    queryInterface.bulkDelete("Attendees", null, {
      truncate: true,
      cascade: true,
      restartIdentity: true,
    });
  },
};
