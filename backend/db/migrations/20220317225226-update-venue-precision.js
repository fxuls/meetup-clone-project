'use strict';

const { query } = require("express");

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn("Venues", "lat", {
      type: Sequelize.DECIMAL(9,6),
    });
    await queryInterface.changeColumn("Venues", "lng", {
      type: Sequelize.DECIMAL(9,6)
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.changeColumn("Venues", "lat", {
      type: Sequelize.DECIMAL(6,5),
    });
    await queryInterface.changeColumn("Venues", "lng", {
      type: Sequelize.DECIMAL(6,5)
    });
  }
};
