const { Users } = require("../models");
const Joi = require("joi");
const { Op } = require("sequelize");

exports.getUsers = async (req, res) => {
  try {
    console.log('req.query:', req.query);
    const limit = parseInt(req.query.limit) || 10;
    const offset = parseInt(req.query.offset) || 0;
    const filter = req.query.filter || {};

    if (req.query.fullname) {
      filter.fullname = {
        [Op.like]: `%${req.query.fullname}%`
      }
    }

    if (req.query.nama_role) {
      const Role = require("../models").Role;
      const role = await Role.findOne({
        where: { nama_role: req.query.nama_role },
      });
      filter.role_id = role.id;
    }

    const users = await Users.findAndCountAll({
      limit,
      offset,
      where: filter,
    });

    res.status(200).json({
      status: "success",
      data: {
        users: users.rows,
        count: users.count,
      },
    });
  } catch (error) {
    console.error('error:', error);
    res.status(400).json({
      status: "fail",
      message: error,
    });
  }
};

exports.createUser = async (req, res) => {
  try {
    if (req.body.password !== req.body.password_confirm) {
      return res.status(400).json({
        message: "Validation error",
        error: ["Passwords do not match"],
      });
    }

    const existingUser = await Users.findOne({
      where: { email: req.body.email },
    });

    if (existingUser) {
      return res.status(400).json({
        message: "Validation error",
        error: ["User with this email already exists"],
      });
    }

    const Role = require("../models").Role;
    const role = await Role.findOne({
      where: { nama_role: "pengelola" },
    });

    const newUser = await Users.create({
      fullname: req.body.fullname,
      email: req.body.email,
      password: req.body.password,
      role_id: role.id,
    });

    return res.status(201).json({
      status: "success",
      data: {
        user: newUser,
      },
    });
  } catch (error) {
    return res.status(400).json({
      message: "Validation error",
      error: error.message,
    });
  }
};


// Update
exports.updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const updates = req.body;

    const user = await Users.findByPk(userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    await user.update(updates);
    return res.status(200).json({
      message: "User updated successfully",
    });
  } catch (error) {
    return res.status(400).json({
      message: "Error updating User",
      error: error.message,
    });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await Users.findByPk(userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json({
      message: "User fetched successfully",
      data: {
        user,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await Users.findByPk(userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Delete the user
    await user.destroy();

    res.json({
      message: "User deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
