"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Events", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      groupId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "Groups",
          },
        },
        onDelete: "cascade",
      },
      venueId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "Venues",
          },
        },
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.TEXT,
      },
      type: {
        type: Sequelize.ENUM('inperson', 'virtual'),
        allowNull: false,
      },
      capacity: {
        type: Sequelize.INTEGER,
      },
      price: {
        type: Sequelize.DECIMAL(9,2),
      },
      startDate: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      endDate: {
        type: Sequelize.DATE,
      },
      numAttending: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      previewImageId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "Images",
          },
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("now"),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("now"),
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Events");
  },
};
