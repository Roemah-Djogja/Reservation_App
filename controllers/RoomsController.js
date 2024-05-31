const { Rooms, Types } = require("../models");
const { Op } = require("sequelize");
const upload = require("../middleware/UploadMiddleware");
const fs = require("fs");
const path = require("path");

exports.getRooms = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const offset = parseInt(req.query.offset) || 0;
    const filter = req.query.filter || {};

    if (req.query.nomor_kamar) {
      filter.nomor_kamar = {
        [Op.like]: `%${req.query.nomor_kamar}%`,
      };
    }

    if (req.query.tipe_kamar) {
      const type = await Types.findOne({
        where: { tipe_kamar: req.query.tipe_kamar },
      });
      filter.type_id = type.id;
    }

    const rooms = await Rooms.findAndCountAll({
      limit,
      offset,
      where: filter,
    });

    res.status(200).json({
      status: "success",
      message: "Rooms retrieved successfully",
      data: {
        rooms: rooms.rows,
        count: rooms.count,
      },
    });
  } catch (error) {
    console.error("error:", error);
    res.status(400).json({
      status: "fail",
      message: error,
    });
  }
};

exports.createRoom = [
  upload,
  async (req, res) => {
    try {
      const imageUrls = req.files.map(
        (file) => `/uploads/rooms/${file.filename}`
      );
      const newRoom = await Rooms.create({
        nomor_kamar: req.body.nomor_kamar,
        type_id: req.body.type_id,
        fasilitas: req.body.fasilitas,
        jml_tamu: req.body.jml_tamu,
        harga: req.body.harga,
        url_gambar: JSON.stringify(imageUrls),
      });

      res.status(201).json({
        status: "success",
        message: "Room created successfully",
        data: {
          room: newRoom,
        },
      });
    } catch (error) {
      res.status(400).json({
        status: "fail",
        message: error,
      });
    }
  },
];

exports.getRoomById = async (req, res) => {
  try {
    const room = await Rooms.findByPk(req.params.id, {
      include: {
        model: Types,
        attributes: ["id", "tipe_kamar", "jml_bed"],
        as: "type",
      },
    });

    if (!room) {
      return res.status(404).json({
        status: "fail",
        message: "Room not found",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Room details",
      data: {
        id_kamar: room.id,
        nomor_kamar: room.nomor_kamar,
        fasilitas: room.fasilitas,
        jml_tamu: room.jml_tamu,
        harga: room.harga,
        url_gambar: room.url_gambar,
        type: {
          id_type: room.type.id,
          tipe_kamar: room.type.tipe_kamar,
          jml_bed: room.type.jumlah_bed,
        },
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

exports.updateRoom = [
  upload,
  async (req, res) => {
    try {
      const room = await Rooms.findByPk(req.params.id);

      if (!room) {
        return res.status(404).json({
          status: "fail",
          message: "Room not found",
        });
      }

      // Update fields
      room.nomor_kamar = req.body.nomor_kamar || room.nomor_kamar;
      room.type_id = req.body.type_id || room.type_id;
      room.fasilitas = req.body.fasilitas || room.fasilitas;
      room.jml_tamu = req.body.jml_tamu || room.jml_tamu;
      room.harga = req.body.harga || room.harga;

      // Handle image upload
      if (req.files.length > 0) {
        // Remove old images
        const oldImages = JSON.parse(room.url_gambar);
        oldImages.forEach((imagePath) => {
          const fullPath = path.join(__dirname, "..", imagePath);
          fs.unlink(fullPath, (err) => {
            if (err) {
              console.error(`Failed to delete old image: ${fullPath}`, err);
            }
          });
        });

        // Save new images
        const imageUrls = req.files.map(
          (file) => `/uploads/rooms/${file.filename}`
        );
        room.url_gambar = JSON.stringify(imageUrls);
      }

      await room.save();

      res.status(200).json({
        status: "success",
        message: "Room has been updated",
        data: {
          room,
        },
      });
    } catch (error) {
      res.status(400).json({
        status: "fail",
        message: error.message,
      });
    }
  },
];

exports.deleteRoom = async (req, res) => {
  try {
    const room = await Rooms.findByPk(req.params.id);

    if (!room) {
      return res.status(404).json({
        status: "fail",
        message: "Room not found",
      });
    }

    // Delete images from filesystem
    const images = JSON.parse(room.url_gambar);
    images.forEach((imagePath) => {
      const fullPath = path.join(__dirname, "..", imagePath);
      fs.unlink(fullPath, (err) => {
        if (err) {
          console.error(`Failed to delete image: ${fullPath}`, err);
        }
      });
    });

    // Delete room from database
    await room.destroy();

    res.status(200).json({
      status: "success",
      message: "Room and its images have been deleted",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};
