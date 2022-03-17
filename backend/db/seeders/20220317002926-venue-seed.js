"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Venues",
      [
        {
          group_id: 1,
          address: "123 Place Rd",
          city: "San Diego",
          state: "Montana",
          lat: 47.036609,
          lng: -110.167096,
        },
        {
          group_id: 2,
          address: "2020 Main St",
          city: "St Louis",
          state: "Missouri",
          lat: 38.508907,
          lng: -90.264414,
        },
        {
          group_id: 2,
          address: "1785 Pennsylvania Ave",
          city: "Portland",
          state: "Oregon",
          lat: 45.434255,
          lng: -122.539415,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    queryInterface.bulkDelete('Venues', null, {
      truncate: true,
      cascade: true,
      restartIdentity: true,
    });
  },
};
