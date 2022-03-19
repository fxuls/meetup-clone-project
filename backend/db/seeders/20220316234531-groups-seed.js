"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Groups", [
      {
        organizerId: 1,
        name: "Awesome group!",
        about: "This is our awesome group! We love to meetup and hang out.",
        type: "inperson",
        private: false,
        previewImageId: 1,
        city: "San Francisco",
        state: "Arkansas",
      },
      {
        organizerId: 1,
        name: "Running friends",
        about:
          "We are a group of friends who love to go running. Come join us at our next event!",
        type: "virtual",
        private: false,
        previewImageId: 2,
      },
      {
        organizerId: 2,
        name: "DnD Game Night",
        about: "Our dungeons and dragons group",
        type: "inperson",
        private: true,
        city: "Pittsburgh",
        state: "Pennsylvania",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    queryInterface.bulkDelete('Groups', null, {
      truncate: true,
      cascade: true,
      restartIdentity: true,
    });
  },
};
