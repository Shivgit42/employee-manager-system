import React, { useEffect, useState } from "react";
import departmentService from "../../services/departmentService";
import { Link } from "react-router-dom";

const ManagerDashboard = () => {
  const [departments, setDepartments] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    departmentService.setAuthToken(token);

    const fetchDepartments = async () => {
      try {
        const res = await departmentService.getDepartments(page);
        console.log("API Response:", res);
        setDepartments(res.departments || []);
        setTotalPages(res.totalPages || 1);
      } catch (err) {
        console.error("Error fetching departments:", err);
        setError("Failed to load departments.");
      }
    };

    fetchDepartments();
  }, [page]);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold text-center">Manager Dashboard</h2>
      {error && <p className="text-red-600 text-center">{error}</p>}{" "}
      {/* Display error message */}
      <div className="mt-4 flex justify-between">
        <Link to="/manager/departments/new" className="btn-primary">
          Create Department
        </Link>
      </div>
      <table className="min-w-full table-auto mt-6 bg-white shadow-lg rounded-lg">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="py-2">Department Name</th>
            <th className="py-2">Category</th>
            <th className="py-2">Location</th>
            <th className="py-2">Salary</th>
            <th className="py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {departments.length > 0 ? (
            departments.map((dept) => (
              <tr key={dept._id} className="border-b hover:bg-gray-100">
                <td className="py-2 px-4">{dept.departmentName}</td>
                <td className="py-2 px-4">{dept.categoryName}</td>
                <td className="py-2 px-4">{dept.location}</td>
                <td className="py-2 px-4">{dept.salary}</td>
                <td className="py-2 px-4">
                  <Link
                    to={`/manager/departments/${dept._id}/edit`}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="py-2 px-4 text-center">
                No departments found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="flex justify-between mt-4">
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          className={`btn-secondary ${
            page === 1 ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          Previous
        </button>
        <button
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages}
          className="btn-secondary"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ManagerDashboard;
