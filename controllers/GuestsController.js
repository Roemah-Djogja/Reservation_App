const { Guests } = require("../models");
const { Op } = require("sequelize");

// getAll
exports.getGuests = async (req, res) => {
    try {
        console.log('req.query:', req.query);
        const limit = parseInt(req.query.limit) || 10;
        const offset = parseInt(req.query.offset) || 0;
        const filter = req.query.nama_lengkap ? { nama_lengkap: { [Op.like]: `%${req.query.nama_lengkap}%` } } : {};

        const guest = await Guests.findAndCountAll({
            limit,
            offset,
            where: filter,
        });

        res.status(200).json({
            status: "success",
            data: {
                guest: guest.rows,
                count: guest.count,
            },
        });
    } catch (error) {
        res.status(400).json({
            message: "Error fetching guests",
            error: error.message,
        });
    }
};

// Create
exports.createGuest = async (req, res) => {
    try {
        const newGuest = await Guests.create({
            nama_lengkap: req.body.nama_lengkap,
            telepon: req.body.telepon,
            alamat: req.body.alamat,
        });
        return res.status(201).json({
            status: "success",
            data: {
                guest: newGuest,
            },
        });
    } catch (error) {
        res.status(400).json({
            message: "Error creating guest",
            error: error.message,
        });
    }
};

// GetById
exports.getGuestById = async (req, res) => {
    try {
        const id = req.params.id;
        const guest = await Guests.findByPk(id);
        if (!guest) {
            return res.status(404).json({
                message: "Guest not found",
            });
        }
        return res.status(200).json({
            status: "success",
            data: {
                guest,
            },
        });
    } catch (error) {
        return res.status(400).json({
            message: "Error searching guest",
            error: error.message,
        });
    }
}

// Update
exports.updateGuest = async (req, res) => {
    try {
        const guestId = req.params.id;
        const updates = req.body;

        const guest = await Guests.findByPk(guestId);
        if (!guest) {
            return res.status(404).json({
                message: "Guest not found",
            });
        }

        await guest.update(updates);
        return res.status(200).json({
            message: "Guest updated successfully",
        });
    } catch (error) {
        return res.status(400).json({
            message: "Error updating guest",
            error: error.message,
        });
    }
};

exports.deleteGuest = async (req, res) => {
    try {
        const guestId = req.params.id;
        const guest = await Guests.findByPk(guestId);
        if (!guest) {
            return res.status(404).json({
                message: "Guest not found",
            });
        }

        // Delete
        await guest.destroy();

        res.json({
            message: "Guest deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
        });
    }
};