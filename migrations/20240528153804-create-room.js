'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Rooms', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      nomor_kamar: {
        type: Sequelize.STRING,
        allowNull: false
      },
      fasilitas: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      jml_tamu: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      harga: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      url_gambar: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      type_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "Types",
          key: "id"
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Rooms');
  }
};