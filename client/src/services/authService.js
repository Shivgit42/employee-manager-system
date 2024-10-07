// services/authService.js
import axios from "axios";

const API_URL = "http://localhost:5000/api/users";

// Register a new user
const register = (userData) => {
  return axios.post(`${API_URL}/signup`, userData);
};

// Login an existing user
const login = (loginData) => {
  return axios.post(`${API_URL}/login`, loginData);
};

// Export the auth service functions
const authService = { register, login };

export default authService;
