import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import departmentService from "../../services/departmentService";
import employeeService from "../../services/employeeService";

const DepartmentCRUD = () => {
  const [department, setDepartment] = useState({
    departmentName: "",
    categoryName: "",
    location: "",
    salary: 0,
    employeeID: [],
  });

  const [employees, setEmployees] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await employeeService.getAllEmployees();
        setEmployees(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchEmployees();

    if (id) {
      const fetchDepartment = async () => {
        try {
          const res = await departmentService.getDepartmentById(id);
          setDepartment(res.data);
        } catch (err) {
          console.error(err);
        }
      };

      fetchDepartment();
    }
  }, [id]);

  const handleChange = (e) => {
    setDepartment({ ...department, [e.target.name]: e.target.value });
  };

  const handleEmployeeChange = (e) => {
    const { options } = e.target;
    const selectedEmployees = Array.from(options)
      .filter((option) => option.selected)
      .map((option) => option.value);
    setDepartment({ ...department, employeeID: selectedEmployees });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await departmentService.updateDepartment(id, department);
      } else {
        await departmentService.createDepartment(department);
      }
      navigate("/manager/dashboard");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold text-center">
        {id ? "Edit Department" : "Create Department"}
      </h2>
      <form
        onSubmit={handleSubmit}
        className="mt-6 bg-white shadow-lg rounded-lg p-6"
      >
        <div className="mb-4">
          <label className="block text-gray-600">Department Name</label>
          <input
            type="text"
            name="departmentName"
            value={department.departmentName}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-600">Category</label>
          <input
            type="text"
            name="categoryName"
            value={department.categoryName}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-600">Location</label>
          <input
            type="text"
            name="location"
            value={department.location}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-600">Salary</label>
          <input
            type="number"
            name="salary"
            value={department.salary}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-600">Assign Employees</label>
          <select
            multiple
            value={department.employeeID}
            onChange={handleEmployeeChange}
            className="mt-1 block w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          >
            {employees.map((employee) => (
              <option key={employee._id} value={employee._id}>
                {employee.firstName} {employee.lastName}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="w-full mt-6 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-500 transition duration-200"
        >
          {id ? "Update Department" : "Create Department"}
        </button>
      </form>
    </div>
  );
};

export default DepartmentCRUD;
