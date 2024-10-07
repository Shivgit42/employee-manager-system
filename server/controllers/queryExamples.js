const User = require("../models/User");

// Query to get employees in the IT department with locations starting with "A"
const getITEmployeesInLocationA = async (req, res) => {
  try {
    const employees = await User.find({
      department: "IT",
      location: { $regex: /^A/i },
    });
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: "Could not retrieve employees" });
  }
};

// Query to get employees in Sales department sorted by name in descending order
const getSalesEmployeesSortedByName = async (req, res) => {
  try {
    const employees = await User.find({ department: "Sales" }).sort({
      lastName: -1,
    });
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: "Could not retrieve employees" });
  }
};

module.exports = { getITEmployeesInLocationA, getSalesEmployeesSortedByName };
