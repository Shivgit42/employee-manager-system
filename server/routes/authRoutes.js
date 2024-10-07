const express = require("express");
const {
  registerUser,
  loginUser,
  getEmployeeDepartment,
  getManagerDepartment,
} = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

// Define the signup route
router.post("/signup", registerUser);

// Define the login route
router.post("/login", loginUser);

// Employee route to get department information (Protected route)
router.get("/employee/department", authMiddleware, getEmployeeDepartment);

// Manager route to get department information (Protected route)
router.get("/manager/department", authMiddleware, getManagerDepartment);

// Route to get manager dashboard data
router.get("/manager/dashboard", authMiddleware, (req, res) => {
  try {
    res.json({ message: "Manager Dashboard" });
  } catch (error) {
    console.error("Error fetching manager dashboard:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
