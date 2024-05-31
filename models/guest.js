'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Guests extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Guests.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      nama_lengkap: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      telepon: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
          is: /^\+(?:[0-9] ?){6,14}[0-9]$/i,
        },
      },
      alamat: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.UUID,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      hooks: {
        beforeCreate: async (guest) => {
          try {
            if (!guest.user_id) {
              const Users = sequelize.models.Users;
              const { id } = await Users.findOne();
              guest.user_id = id;
            }
          } catch (error) {
            throw new Error(`Error in beforeCreate hook: ${error.message}`);
          }
        }
      },
      sequelize,
      modelName: 'Guests',
    }
  );
  return Guests;
};