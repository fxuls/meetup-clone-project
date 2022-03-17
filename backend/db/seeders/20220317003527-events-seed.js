'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   await queryInterface.bulkInsert("Events", [
     {
       group_id: 1,
       venue_id: 1,
       name: "Awesome event!",
       description: "This is our first Awesome event. We will be awesome together.",
       type: "inperson",
       capacity: 100,
       price: 100.59,
       start_date: new Date(),
       end_date: new Date(),
       preview_image_id: 4,
     },
     {
      group_id: 2,
      venue_id: 2,
      name: "Running around the park",
      description: "We will be running around the park",
      type: "inperson",
      start_date: new Date(),
      preview_image_id: 5,
     },
     {
      group_id: 3,
      name: "Weekly DnD",
      type: "virtual",
      start_date: new Date(),
      end_date: new Date(),
      preview_image_id: 5,
     },
   ], {})
  },

  async down (queryInterface, Sequelize) {
    // TODO add down for events seeders
  }
};
