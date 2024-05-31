"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Rooms extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Rooms.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      nomor_kamar: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      fasilitas: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      jml_tamu: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      harga: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      url_gambar: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      type_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Rooms",
    }
  );

  Rooms.associate = (models) => {
    Rooms.belongsTo(models.Types, {
      foreignKey: "type_id",
      as: "type",
    });
  };

  return Rooms;
};
