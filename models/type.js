"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Types extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Types.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      tipe_kamar: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      jml_bed: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Types",
    }
  );

  Types.associate = (models) => {
    Types.hasMany(models.Rooms, {
      foreignKey: "type_id",
      as: "rooms",
    });
  };

  return Types;
};
