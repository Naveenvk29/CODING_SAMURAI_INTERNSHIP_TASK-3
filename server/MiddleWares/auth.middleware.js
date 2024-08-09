import jwt from "jsonwebtoken";
import User from "../Models/user.model.js";
import asyncHandler from "../Utils/asyncHnadler.js";

const authenticate = asyncHandler(async (req, res, next) => {
  let token;
  token = req.cookies.jwt;
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      req.user = await User.findById(decoded.userId).select("-password");
      next();
    } catch (error) {
      res.status(401).json({ message: "Invalid token, please login again." });
    }
  } else {
    res.status(401).json({ message: "You are not logged in." });
  }
});

export default authenticate;
