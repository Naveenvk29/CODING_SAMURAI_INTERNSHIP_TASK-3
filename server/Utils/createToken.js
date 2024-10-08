import jwt from "jsonwebtoken";

const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.SECRET_KEY, {
    expiresIn: "3d",
  });
  res.cookie("jwt", token, {
    httpOnly: true,
    sameSite: true,
    secure: process.env.NODE_ENV !== "development",
    maxAge: 3 * 24 * 60 * 60 * 1000, // 3 days
  });
  return token;
};

export default generateToken;
