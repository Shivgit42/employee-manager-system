const express = require("express");
const { registerUser, loginUser } = require("../controllers/userController");
const router = express.Router();

// User signup and login routes
router.post("/signup", registerUser);
router.post("/login", loginUser);

module.exports = router;
