import React from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const ProtectedRoute = ({ children, requiredRole }) => {
  const token = localStorage.getItem("token");

  // Check if the token exists
  if (!token) {
    return <Navigate to="/login" />;
  }

  try {
    const decodedToken = jwtDecode(token); // Decode the JWT token

    // Check if the token has expired
    const isExpired = decodedToken.exp * 1000 < Date.now();
    if (isExpired) {
      localStorage.removeItem("token"); // Remove expired token
      return <Navigate to="/login" />; // Redirect to login if the token is expired
    }

    // Check for required role (if needed)
    if (requiredRole && decodedToken.role !== requiredRole) {
      return decodedToken.role === "manager" ? (
        <Navigate to="/manager/dashboard" />
      ) : (
        <Navigate to="/employee/dashboard" />
      );
    }
  } catch (error) {
    console.error("Invalid token:", error);
    localStorage.removeItem("token");
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
