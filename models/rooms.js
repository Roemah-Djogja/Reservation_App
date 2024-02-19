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
      room_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      room_capacity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      room_status: {
        type: DataTypes.ENUM("Available", "Reserved", "Occupied"),
        allowNull: false,
      },
      room_price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.UUID,
      },
    },
    {
      sequelize,
      modelName: "Rooms",
    }
  );
  return Rooms;
};
