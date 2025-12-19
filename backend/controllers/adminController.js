const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User"); // adjust path

// adminController.js

exports.loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 🔹 Change this line:
    const user = await User.findOne({ email, role: "admin" });
    if (!user) return res.status(401).json({ message: "Admin not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Wrong password" });

    const token = jwt.sign(
      { id: user._id, role: user.role, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({ message: "Login successful", token });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
