
import React from "react";
import { Nav } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import {
  FaHome,
  FaUsers,
  FaCalendarAlt,
  FaChartBar,
  FaUserCircle,
} from "react-icons/fa";
import authService from "../../services/authService";
import "../../styles/layout.css";

const Sidebar = () => {
  const location = useLocation();
  const user = authService.getCurrentUser();

  const isHR = user?.role === "HR";
  const isManager = user?.role === "Manager";

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h3>EMS</h3>
        <p>{user?.role}</p>
      </div>
      <Nav className="flex-column">
        <Nav.Item>
          <Nav.Link
            as={Link}
            to="/"
            className={location.pathname === "/" ? "active" : ""}
          >
            <FaHome className="me-2" /> Dashboard
          </Nav.Link>
        </Nav.Item>

        {(isHR || isManager) && (
          <Nav.Item>
            <Nav.Link
              as={Link}
              to="/employees"
              className={
                location.pathname.includes("/employees") ? "active" : ""
              }
            >
              <FaUsers className="me-2" /> Employees
            </Nav.Link>
          </Nav.Item>
        )}

        <Nav.Item>
          <Nav.Link
            as={Link}
            to="/leaves"
            className={location.pathname.includes("/leaves") ? "active" : ""}
          >
            <FaCalendarAlt className="me-2" /> Leave Management
          </Nav.Link>
        </Nav.Item>

        {isHR && (
          <Nav.Item>
            <Nav.Link
              as={Link}
              to="/reports"
              className={location.pathname.includes("/reports") ? "active" : ""}
            >
              <FaChartBar className="me-2" /> Reports
            </Nav.Link>
          </Nav.Item>
        )}

        <Nav.Item>
          <Nav.Link
            as={Link}
            to="/profile"
            className={location.pathname.includes("/profile") ? "active" : ""}
          >
            <FaUserCircle className="me-2" /> My Profile
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </div>
  );
};

export default Sidebar;
