'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.bulkInsert("Events", [
     {
       groupId: 1,
       venueId: 1,
       name: "Game night",
       description: "Lets have a game night! I will have plenty of appetizer food, menu to come soon. BYOB. I will message my address closer to.",
       type: "inperson",
       capacity: 20,
       price: 0,
       startDate: "2022-05-13T23:00:00.000Z",
       endDate: "2022-05-13T03:00:00.000Z",
       previewImageId: 6,
     },
     {
      groupId: 1,
      name: "Virtual game night",
      description: "We will have a relaxing chill night of online gaming! We will all sign on at 6:00pm and go until about 9:00pm or whatever time everyone feels like getting off! :)",
      type: "virtual",
      startDate: "2022-05-15T23:00:00.000Z",
      previewImageId: 8,
     },
     {
      groupId: 2,
      name: "Tennis Scrimmages",
      description: "Friendly tennis scrimmages in the park!",
      type: "inperson",
      venueId: 2,
      startDate: "2022-05-13T13:00:00.000Z",
      endDate: "2022-05-13T16:00:00.000Z",
      previewImageId: 10,
     },
     {
      groupId: 3,
      name: "Walking along the rivers",
      description: "We will be walking along the rivers! Come join us.",
      type: "inperson",
      venueId: 3,
      startDate: "2022-05-13T11:30:00.000Z",
      endDate: "2022-05-13T13:30:00.000Z",
      previewImageId: 11,
     },
     {
      groupId: 3,
      name: "Group planning meeting",
      description: "We will be meeting on Zoom in order to plan out our events for the summer.",
      type: "virtual",
      startDate: "2022-05-16T21:00:00.000Z",
      endDate: "2022-05-16T22:15:00.000Z",
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
