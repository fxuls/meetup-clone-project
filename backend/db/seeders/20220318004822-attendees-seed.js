"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Attendees",
      [
        { userId: 1, eventId: 1 },
        { userId: 1, eventId: 2 },
        { userId: 2, eventId: 1 },
        { userId: 2, eventId: 3 },
        { userId: 3, eventId: 3 },
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
