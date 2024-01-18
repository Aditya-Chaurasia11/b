// controllers/AdminController.js
const Admin = require("../../modals/Admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const AdminController = {
  register: async (req, res) => {
    try {
      const { username, password } = req.body;

      // Check if the username is already taken
      const existingAdmin = await Admin.findOne({ username });
      if (existingAdmin) {
        return res.status(400).json({ message: "Username already taken" });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new admin
      const newAdmin = new Admin({ username, password: hashedPassword });
      await newAdmin.save();

      res.status(201).json({ message: "Admin registered successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  login: async (req, res) => {
    try {
      const { username, password } = req.body;

      // Find the admin by username
      const admin = await Admin.findOne({ username });
      if (!admin) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      // Check the password
      const isPasswordValid = await bcrypt.compare(password, admin.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      // Generate a JWT token
      const token = jwt.sign(
        { adminId: admin._id, username: admin.username },
        "your-secret-key",
        {
          expiresIn: "1h",
        }
      );

      res
        .status(200)
        .json({ token, adminId: admin._id, username: admin.username });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  getAdmins: async (req, res) => {
    try {
      const admins = await Admin.find({}, "username");
      res.status(200).json(admins);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
};

module.exports = AdminController;
