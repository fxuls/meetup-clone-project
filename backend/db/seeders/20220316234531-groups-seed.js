"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Groups", [
      {
        organizerId: 1,
        name: "Board Games",
        about: "Bring your favorite board and card games for a night of fun and games! We'll start at around 6:30 and go until people decide to leave. BYOB and bring your own food if you want, or we can all chip in for a pizza.",
        type: "inperson",
        private: false,
        previewImageId: 1,
        city: "San Francisco",
        state: "California",
        numMembers: 5,
      },
      {
        organizerId: 2,
        name: "Outdoor Tennis",
        about: "This is the group for people who want to play tennis together. All levels are welcome. See individual event titles to see if it's for Beginners, All Levels, and Intermediate.",
        type: "inperson",
        private: false,
        previewImageId: 3,
        city: "Miami",
        state: "Florida",
        numMembers: 3,
      },
      {
        organizerId: 3,
        name: "Slowpokes Walking Group",
        about: "This group is for people who struggle to keep up with other walking or hiking groups.\n\nWe'll walk at a pace comfortable to all participants, although some walks may allow faster walkers to go ahead and meet back up. No one will be left behind. If you need to slow down or take a break, just let us know. If you need to leave early during a walk, please let the organizer know.\n\nWe'll also stick to moderate terrain. Maybe some hills, but not tough ones unless noted. Hikes will be suitable for walking shoes, unless the need for boots is noted.\n\nWalks will begin 5 minutes after the scheduled time, unless someone has called to say they're lost or running late.\n\nThe decision to cancel due to weather will be made at least two hours in advance.",
        type: "inperson",
        private: true,
        previewImageId: 5,
        city: "Pittsburgh",
        state: "Pennsylvania",
        numMembers: 3,
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
