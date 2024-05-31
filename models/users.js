"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Define association here
    }
  }

  Users.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      fullname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role_id: {
        type: DataTypes.UUID,
      },
    },
    {
      hooks: {
        beforeCreate: async (user) => {
          try {
            if (user.password) {
              const salt = bcrypt.genSaltSync(10);
              user.password = bcrypt.hashSync(user.password, salt);
            }
          } catch (error) {
            throw new Error(`Error in beforeCreate hook: ${error.message}`);
          }
        },
        beforeUpdate: async (user) => {
          try {
            if (user.password) {
              const salt = bcrypt.genSaltSync(10);
              user.password = bcrypt.hashSync(user.password, salt);
            }
          } catch (error) {
            throw new Error(`Error in beforeUpdate hook: ${error.message}`);
          }
        },
      },
      sequelize,
      modelName: "Users",
    }
  );

  Users.prototype.CorrectPassword = async (reqPass, passDb) => {
    return await bcrypt.compareSync(reqPass, passDb);
  };

  return Users;
};
