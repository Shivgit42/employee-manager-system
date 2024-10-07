const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register a new user (Employee or Manager)
const registerUser = async (req, res) => {
  const { firstName, lastName, gender, hobbies, email, password, role } =
    req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await User.create({
      firstName,
      lastName,
      gender,
      hobbies,
      email,
      password: hashedPassword,
      role,
    });

    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

// User login
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, role: user.role.toLowerCase() },
      process.env.JWT_SECRET,
      { expiresIn: "1w" }
    );

    res.status(200).json({ token, role: user.role.toLowerCase() });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = { registerUser, loginUser };
