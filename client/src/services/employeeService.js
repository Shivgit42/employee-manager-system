// services/employeeService.js
import axios from "axios";

const API_URL = "/api/employee";

const getEmployeeDepartment = () => {
  const token = localStorage.getItem("token");
  return axios.get(`${API_URL}/department`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const employeeService = { getEmployeeDepartment };

export default employeeService;
