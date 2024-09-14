const User = require("./Models/userSchema");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const authmiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(411).json({ message: "token is not there!" });
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    console.log(err);
  }
  
};

module.exports = {
  authmiddleware,
};
