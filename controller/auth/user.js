// controllers/UserController.js
const User = require("../../modals/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require("../../modals/Admin");

const UserController = {
  register: async (req, res) => {
    try {
      const { username, password, adminId } = req.body;

      // Check if the username is already taken
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(400).json({ message: "Username already taken" });
      }

      // Find the selected admin
      const admin = await Admin.findById(adminId);
      if (!admin) {
        return res.status(404).json({ message: "Admin not found" });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user associated with the selected admin
      const newUser = new User({
        username,
        password: hashedPassword,
        admin: adminId,
      });
      await newUser.save();

      res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  login: async (req, res) => {
    try {
      const { username, password } = req.body;

      // Find the user by username
      const user = await User.findOne({ username }).populate("admin");
      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      // Check the password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      // Generate a JWT token
      const token = jwt.sign(
        { userId: user._id, username: user.username, adminId: user.admin._id },
        "your-secret-key",
        { expiresIn: "1h" }
      );

      res.status(200).json({
        token,
        userId: user._id,
        username: user.username,
        adminId: user.admin._id,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  // controllers/adminController.js
  // const User = require('../models/User');

  // getUsersForAdmin: async (req, res) => {
  //   try {
  //     const { adminId } = req.params;

  //     const users = await User.find({ admin: adminId });
  //     res.json(users);
  //   } catch (error) {
  //     console.error(error);
  //     res.status(500).json({ error: "Internal Server Error" });
  //   }
  // },
  getClient: async (req, res) => {
    try {
      const admins = await User.find({});
      res.status(200).json(admins);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
};

module.exports = UserController;
