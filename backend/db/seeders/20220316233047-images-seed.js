"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert("Images", [
      { url: "/images/image1.png" },
      { url: "/images/image2.png" },
      { url: "/images/image3.png" },
      { url: "/images/image4.png" },
      { url: "/images/image5.png" },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(
      "Images",
      {
        url: {
          [Op.in]: [
            "/images/image1.png",
            "/images/image2.png",
            "/images/image3.png",
            "/images/image4.png",
            "/images/image5.png",
          ],
        },
      },
      {}
    );
  },
};
