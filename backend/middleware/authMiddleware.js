require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../models/User.js");

const protect = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res
        .status(401)
        .json({ message: "Not authorized to access this route" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded.id) {
      return res.status(401).json({ message: "Invalid Token" });
    }

    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "No user found with this ID" });
    }

    req.user = user;
    next();
  } catch (e) {
    if (e.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid Token" });
    }
    if (e.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token Expired" });
    }
    return res
      .status(500)
      .json({ message: "Internal server error", error: e.message });
  }
};

module.exports = { protect };
