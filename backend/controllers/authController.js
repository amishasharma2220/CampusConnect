const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// LOGIN
exports.login = async (req, res) => {
  try {
    let { email, password } = req.body;
    email = email.toLowerCase().trim();

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined");
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    const userData = user.toObject();
    delete userData.password;
    res.json({ token, user: userData });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// REGISTER
exports.register = async (req, res) => {
  try {
    console.log("🔥 REGISTER HIT", req.body);

    let { name, email, password, registrationNumber, role } = req.body;
    email = email.toLowerCase().trim();

    if (!name || !email || !password || !registrationNumber) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      registrationNumber,
      role: role || "student",
      eventsAttended: 0,
      certificatesEarned: 0,
      registeredEvents: []
    });

    const savedUser = await user.save();
    console.log("✅ USER SAVED:", savedUser);

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined");
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    const userData = user.toObject();
    delete userData.password;

    res.status(201).json({
      message: "User registered successfully",
      token,
      user: userData
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};