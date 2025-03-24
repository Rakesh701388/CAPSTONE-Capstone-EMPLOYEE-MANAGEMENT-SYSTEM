import React from "react";
import { Navigate } from "react-router-dom";
import authService from "../../services/authService";

const RoleRoute = ({ roles, children }) => {
  const isAuthenticated = authService.isAuthenticated();
  const user = authService.getCurrentUser();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (!roles.includes(user.role)) {
    return <Navigate to="/" />;
  }

  return children;
};

export default RoleRoute;
