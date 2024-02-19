"use strict";
const { v4: uuidv4 } = require("uuid");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    const userId = await queryInterface.rawSelect(
      "Users",
      {
        where: {
          email: "admin@mail.com",
        },
      },
      ["id"]
    );
    await queryInterface.bulkInsert(
      "Rooms",
      [
        {
          id: uuidv4(),
          room_name: "Room 1",
          room_capacity: 2,
          room_status: "Available",
          room_price: 170000,
          user_id: userId,
        },
      ],
      ["id"]
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Rooms", null, {});
  },
};
