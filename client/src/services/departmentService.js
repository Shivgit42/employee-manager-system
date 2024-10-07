import axios from "axios";

const API_URL = "/api/departments";

// Function to set the authorization header with the token
const setAuthHeader = () => {
  const token = localStorage.getItem("token");
  if (token) {
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  }
  return {}; // Return an empty object if no token is present
};

// Functions to handle department CRUD operations
const getDepartments = async (page) => {
  try {
    const response = await axios.get(
      `${API_URL}?page=${page}`,
      setAuthHeader()
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching departments:", error);
    throw error;
  }
};

const getDepartmentById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`, setAuthHeader());
    return response.data;
  } catch (error) {
    console.error(`Error fetching department with ID ${id}:`, error);
    throw error;
  }
};

const createDepartment = async (data) => {
  try {
    const response = await axios.post(API_URL, data, setAuthHeader());
    return response.data;
  } catch (error) {
    console.error("Error creating department:", error);
    throw error;
  }
};

const updateDepartment = async (id, data) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, data, setAuthHeader());
    return response.data;
  } catch (error) {
    console.error(`Error updating department with ID ${id}:`, error);
    throw error;
  }
};

const deleteDepartment = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`, setAuthHeader());
    return response.data;
  } catch (error) {
    console.error(`Error deleting department with ID ${id}:`, error);
    throw error;
  }
};

const departmentService = {
  getDepartments,
  getDepartmentById,
  createDepartment,
  updateDepartment,
  deleteDepartment,
};

export default departmentService;
