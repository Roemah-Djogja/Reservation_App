const { Rooms } = require("../models");

exports.getRooms = async (req, res) => {
  try {
    const rooms = await Rooms.findAll();
    res.status(200).json({
      status: "success",
      data: {
        rooms,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error,
    });
  }
};
