"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Images", [
      { url: "/images/image1.png" },
      { url: "/images/image2.png" },
      { url: "/images/image3.png" },
      { url: "/images/image4.png" },
      { url: "/images/image5.png" },
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
