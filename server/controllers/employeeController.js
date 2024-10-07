// controllers/employeeController.js
const User = require("../models/User");
const Department = require("../models/Department");

// Controller to get employee's department
const getEmployeeDepartment = async (req, res) => {
  try {
    const employeeId = req.user.id;

    // Find the employee based on the ID and populate the department field
    const employee = await User.findById(employeeId).populate("department");

    if (!employee || !employee.department) {
      return res.status(404).json({ msg: "No department assigned" });
    }

    // Return the department details
    res.json(employee.department);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};

module.exports = { getEmployeeDepartment };
