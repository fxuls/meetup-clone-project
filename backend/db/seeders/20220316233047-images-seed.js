"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Images", [
      { url: "/images/group1_1.png" },
      { url: "/images/group1_2.png" },
      { url: "/images/group2_1.png" },
      { url: "/images/group2_2.png" },
      { url: "/images/group3_1.png" },
      { url: "/images/event1_1.png" },
      { url: "/images/event1_2.png" },
      { url: "/images/event2_1.png" },
      { url: "/images/event2_2.png" },
      { url: "/images/event3_1.png" },
      { url: "/images/event4_1.png" },
    ]);
  },

  async down(queryInterface, Sequelize) {
    queryInterface.bulkDelete('Images', null, {
      truncate: true,
      cascade: true,
      restartIdentity: true,
    });
  },
};
