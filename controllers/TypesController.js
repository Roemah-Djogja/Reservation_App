const { Types } = require("../models");
const { Op } = require("sequelize");

exports.getTypes = async (req, res) => {
    try {
        // console.log('req.query:', req.query);
        const limit = parseInt(req.query.limit) || 10;
        const offset = parseInt(req.query.offset) || 0;
        const filter = req.query.tipe_kamar ? { tipe_kamar: { [Op.like]: `%${req.query.tipe_kamar}%` } } : {};

        const type = await Types.findAndCountAll({
            limit,
            offset,
            where: filter,
        });

        res.status(200).json({
            status: "success",
            data: {
                type: type.rows,
                count: type.count,
            },
        });
    } catch (error) {
        res.status(400).json({
            message: "Error fetching types",
            error: error.message,
        });
    }
};

// Create
exports.createType = async (req, res) => {
    try {
        const newType = await Types.create({
            tipe_kamar: req.body.tipe_kamar,
            jml_bed: req.body.jml_bed,
        });
        return res.status(201).json({
            status: "success",
            data: {
                Type: newType,
            },
        });
    } catch (error) {
        res.status(400).json({
            message: "Error creating Type",
            error: error.message,
        });
    }
};

// getTypeById
exports.getTypeById = async (req, res) => {
    try {
        const id = req.params.id;
        const type = await Types.findByPk(id);
        if (!type) {
            return res.status(404).json({
                message: "Type not found",
            });
        }
        return res.status(200).json({
            status: "success",
            data: {
                type,
            },
        });
    } catch (error) {
        return res.status(400).json({
            message: "Error searching type",
            error: error.message,
        });
    }
}


// Update
exports.updateType = async (req, res) => {
    try {
        const typeId = req.params.id;
        const updates = req.body;

        const type = await Types.findByPk(typeId);
        if (!type) {
            return res.status(404).json({
                message: "Type not found",
            });
        }

        await type.update(updates);
        return res.status(200).json({
            message: "Type updated successfully",
        });
    } catch (error) {
        return res.status(400).json({
            message: "Error updating type",
            error: error.message,
        });
    }
};

exports.deleteType = async (req, res) => {
    try {
        const typeId = req.params.id;
        const type = await Types.findByPk(typeId);
        if (!type) {
            return res.status(404).json({
                message: "Type not found",
            });
        }

        // Delete
        await type.destroy();

        res.json({
            message: "Type deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
        });
    }
};