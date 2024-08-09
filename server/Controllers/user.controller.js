import User from "../Models/user.model.js";
import asyncHandler from "../Utils/asyncHnadler.js";
import createToken from "../Utils/createToken.js";

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required." });
  }
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "Email already exists." });
  }
  const user = new User({ username, email, password });
  try {
    await user.save();
    createToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error.");
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required." });
  }
  const user = await User.findOne({ email });
  if (user) {
    const isMatch = await user.comparePassword(password);
    if (isMatch) {
      createToken(res, user._id);
      res.json({
        _id: user._id,
        username: user.username,
        email: user.email,
      });
    } else {
      return res.status(401).json({ message: "Invalid credentials." });
    }
  } else {
    return res.status(404).json({ message: "User not found." });
  }
});

const logout = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    expires: new Date(0),
    httpOnly: true,
  });
  res.json({ message: "User logged out." });
});

const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) {
    return res.status(404).json({ message: "User not found." });
  }
  res.json({
    _id: user._id,
    username: user.username,
    email: user.email,
  });
});

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;
    user.password = req.body.password || user.password;

    await user.save();
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
    });
  } else {
    return res.status(404).json({ message: "User not found." });
  }
});

export { registerUser, loginUser, logout, getUserProfile, updateUserProfile };
