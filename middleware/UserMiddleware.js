const { Users, Role } = require("../models");
const jwt = require("jsonwebtoken");

// middleware can be use on protect routes
exports.authMiddleware = async (req, res, next) => {
  let token;

  // Check for token in cookies (modify based on your implementation)
  token = req.cookies.jwt;
  try {
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    // Access user information from decoded data or database
    const user = await Users.findByPk(decoded.id); // Assuming Users model

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    // console.error("Error verifying token:", error);
    return res.status(401).json({
      status: 401,
      message: "Unauthorized Access",
    });
  }
};

// example :
// const { authMiddleware } = require("../middleware/UserMiddleware");
// router.post("/reserve", authMiddleware, ReservRoom);

exports.permissionUser = (...roles) => {
  return async (req, res, next) => {
    const rolesData = await Role.findByPk(req.user.role_id);
    const userRole = rolesData.nama_role;

    if (!roles.includes(userRole)) {
      return next(
        res.status(403).json({
          status: 403,
          message: "Forbidden Access",
        })
      );
    }

    next();
  };
};

// example :
// const { permissionUser } = require("../middleware/UserMiddleware");
// router.post("/transaction", authMiddleware, permissionUser("admin"), Transaction);
