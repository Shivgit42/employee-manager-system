const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Department = require("../models/Department");

// Register user (Common for Employee and Manager)
exports.registerUser = async (req, res) => {
  const { firstName, lastName, email, password, role, gender, hobbies } =
    req.body;

  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: "User already exists" });

    user = new User({
      firstName,
      lastName,
      email,
      password,
      role,
      gender,
      hobbies,
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();

    const payload = { user: { id: user.id, role: user.role } };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1w",
    });

    res.status(201).json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Login user
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    const payload = { user: { id: user.id, role: user.role } };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Get employee department information
exports.getEmployeeDepartment = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).populate("department");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.department) {
      return res.status(404).json({ message: "No department assigned" });
    }

    return res.status(200).json({
      departmentName: user.department.departmentName,
      location: user.department.location,
      salary: user.department.salary,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

// Get manager department information
exports.getManagerDepartment = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const departments = await Department.find({ manager: userId });

    if (departments.length === 0) {
      return res
        .status(404)
        .json({ message: "No departments found for this manager" });
    }

    return res.status(200).json({ departments });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};
