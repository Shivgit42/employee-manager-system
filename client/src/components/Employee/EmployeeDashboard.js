import React, { useEffect, useState } from "react";
import employeeService from "../../services/employeeService";

const EmployeeDashboard = () => {
  const [department, setDepartment] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDepartment = async () => {
      try {
        const res = await employeeService.getEmployeeDepartment();
        setDepartment(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDepartment();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl">Employee Dashboard</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="mt-4">
          {department ? (
            <>
              <p>
                <strong>Department:</strong> {department.departmentName}
              </p>
              <p>
                <strong>Location:</strong> {department.location}
              </p>
              <p>
                <strong>Salary:</strong> {department.salary}
              </p>
            </>
          ) : (
            <p className="text-red-600">No department assigned.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default EmployeeDashboard;
