import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Common/Navbar";
import Signup from "./components/Common/Signup";
import Login from "./components/Common/Login"; // Updated to use the common Login component
import EmployeeDashboard from "./components/Employee/EmployeeDashboard";
import ManagerDashboard from "./components/Manager/ManagerDashboard";
import DepartmentCRUD from "./components/Manager/DepartmentCRUD";
import ProtectedRoute from "./components/Common/ProtectedRoute";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />{" "}
        {/* Login for both employees and managers */}
        {/* Protecting the Employee Dashboard */}
        <Route
          path="/employee/dashboard"
          element={<ProtectedRoute element={<EmployeeDashboard />} />}
        />
        {/* Protecting the Manager Dashboard */}
        <Route
          path="/manager/dashboard"
          element={
            <ProtectedRoute
              requiredRole="manager"
              element={<ManagerDashboard />}
            />
          }
        />
        {/* Protected Routes for Department Management */}
        <Route
          path="/manager/departments/new"
          element={<ProtectedRoute element={<DepartmentCRUD />} />}
        />
        <Route
          path="/manager/departments/:id/edit"
          element={<ProtectedRoute element={<DepartmentCRUD />} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
