"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Venues",
      [
        {
          groupId: 1,
          address: "123 Place Rd",
          city: "San Francisco",
          state: "California",
          lat: 47.036609,
          lng: -110.167096,
        },
        {
          groupId: 2,
          address: "2020 Main St",
          city: "Miami",
          state: "Florida",
          lat: 38.508907,
          lng: -90.264414,
        },
        {
          groupId: 2,
          address: "1785 Pennsylvania Ave",
          city: "Pittsburgh",
          state: "Pennsylvania",
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
