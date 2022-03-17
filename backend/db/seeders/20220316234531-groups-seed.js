"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Groups", [
      {
        organizer_id: 1,
        name: "Awesome group!",
        about: "This is our awesome group! We love to meetup and hang out.",
        type: "inperson",
        private: false,
        preview_image_id: 1,
        city: "San Francisco",
        state: "Arkansas",
      },
      {
        organizer_id: 1,
        name: "Running friends",
        about:
          "We are a group of friends who love to go running. Come join us at our next event!",
        type: "virtual",
        private: false,
        preview_image_id: 2,
      },
      {
        organizer_id: 2,
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
