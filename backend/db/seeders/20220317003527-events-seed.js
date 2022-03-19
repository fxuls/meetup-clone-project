'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.bulkInsert("Events", [
     {
       groupId: 1,
       venueId: 1,
       name: "Awesome event!",
       description: "This is our first Awesome event. We will be awesome together.",
       type: "inperson",
       capacity: 100,
       price: 100.59,
       startDate: new Date(),
       endDate: new Date(),
       previewImageId: 4,
     },
     {
      groupId: 2,
      venueId: 2,
      name: "Running around the park",
      description: "We will be running around the park",
      type: "inperson",
      startDate: new Date(),
      previewImageId: 5,
     },
     {
      groupId: 3,
      name: "Weekly DnD",
      type: "virtual",
      startDate: new Date(),
      endDate: new Date(),
      previewImageId: 5,
     },
   ], {})
  },

  async down (queryInterface, Sequelize) {
    queryInterface.bulkDelete('Events', null, {
      truncate: true,
      cascade: true,
      restartIdentity: true,
    });
  }
};
