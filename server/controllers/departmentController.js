const Department = require("../models/Department");
const User = require("../models/User");

// Create a new department
const createDepartment = async (req, res) => {
  const { departmentName, categoryName, location, salary } = req.body;
  try {
    const department = new Department({
      departmentName,
      categoryName,
      location,
      salary,
    });
    await department.save();
    res
      .status(201)
      .json({ message: "Department created successfully", department });
  } catch (error) {
    console.error("Error creating department:", error);
    res
      .status(500)
      .json({ message: "Could not create department", error: error.message });
  }
};

// Get paginated list of departments
const getDepartments = async (req, res) => {
  const { page = 1, limit = 5 } = req.query;
  try {
    const departments = await Department.find()
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const totalDepartments = await Department.countDocuments(); // Count total departments
    res.status(200).json({
      message: "Departments fetched successfully",
      totalDepartments,
      departments,
    });
  } catch (error) {
    console.error("Error fetching departments:", error);
    res
      .status(500)
      .json({ message: "Could not fetch departments", error: error.message });
  }
};

// Update a department
const updateDepartment = async (req, res) => {
  const { id } = req.params;
  const { departmentName, categoryName, location, salary } = req.body;
  try {
    const updatedDepartment = await Department.findByIdAndUpdate(
      id,
      { departmentName, categoryName, location, salary },
      { new: true, runValidators: true }
    );

    if (!updatedDepartment) {
      return res.status(404).json({ message: "Department not found" });
    }

    res
      .status(200)
      .json({ message: "Department updated successfully", updatedDepartment });
  } catch (error) {
    console.error("Error updating department:", error);
    res
      .status(500)
      .json({ message: "Could not update department", error: error.message });
  }
};

// Delete a department
const deleteDepartment = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedDepartment = await Department.findByIdAndRemove(id);

    if (!deletedDepartment) {
      return res.status(404).json({ message: "Department not found" });
    }

    res.status(200).json({ message: "Department deleted successfully" });
  } catch (error) {
    console.error("Error deleting department:", error);
    res
      .status(500)
      .json({ message: "Could not delete department", error: error.message });
  }
};

// Assign employees to a department
const assignEmployees = async (req, res) => {
  const { id } = req.params;
  const { employeeIds } = req.body;
  try {
    const department = await Department.findById(id);
    if (!department) {
      return res.status(404).json({ message: "Department not found" });
    }

    department.employees = [
      ...new Set([...department.employees, ...employeeIds]),
    ];
    await department.save();

    res
      .status(200)
      .json({ message: "Employees assigned successfully", department });
  } catch (error) {
    console.error("Error assigning employees:", error);
    res
      .status(500)
      .json({ message: "Could not assign employees", error: error.message });
  }
};

module.exports = {
  createDepartment,
  getDepartments,
  updateDepartment,
  deleteDepartment,
  assignEmployees,
};
