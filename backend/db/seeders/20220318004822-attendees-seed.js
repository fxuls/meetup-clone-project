"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Attendees",
      [
        { user_id: 1, event_id: 1 },
        { user_id: 1, event_id: 2 },
        { user_id: 2, event_id: 1 },
        { user_id: 2, event_id: 3 },
        { user_id: 3, event_id: 3 },
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
