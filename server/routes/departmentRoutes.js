const express = require("express");
const {
  createDepartment,
  getDepartments,
  updateDepartment,
  deleteDepartment,
  assignEmployees,
} = require("../controllers/departmentController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Protect these routes with the authentication middleware
router.use(authMiddleware);

// Department CRUD routes
router.post("/", createDepartment);
router.get("/", getDepartments);
router.put("/:id", updateDepartment);
router.delete("/:id", deleteDepartment);
router.put("/assign/:id", assignEmployees);

module.exports = router;
