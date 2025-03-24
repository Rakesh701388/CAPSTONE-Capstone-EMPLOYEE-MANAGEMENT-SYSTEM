// src/pages/Dashboard/Dashboard.js
import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import {
  FaUsers,
  FaCalendarAlt,
  FaCheckCircle,
  FaHourglassHalf,
} from "react-icons/fa";
import employeeService from "../../services/employeeService";
import leaveService from "../../services/leaveService";
import authService from "../../services/authService";
import "../../styles/dashboard.css";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalEmployees: 0,
    pendingLeaves: 0,
    approvedLeaves: 0,
    rejectedLeaves: 0,
  });
  const [loading, setLoading] = useState(true);
  const user = authService.getCurrentUser();
  const isHR = user?.role === "HR";
  const isManager = user?.role === "Manager";

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        let employees = [];
        let leaveRequests = [];

        // Fetch data based on user role
        if (isHR || isManager) {
          if (isHR) {
            employees = await employeeService.getAllEmployees();
          }
          leaveRequests = await leaveService.getLeaveRequests();
        }

        // Calculate statistics
        setStats({
          totalEmployees: employees?.$values.length,
          pendingLeaves: leaveRequests?.$values.filter((lr) => lr.status === "Pending")
            .length,
          approvedLeaves: leaveRequests?.$values.filter((lr) => lr.status === "Approved")
            .length,
          rejectedLeaves: leaveRequests?.$values.filter((lr) => lr.status === "Rejected")
            .length,
        });
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [isHR, isManager]);

  return (
    <Container fluid className="dashboard-container p-4">
      <h1 className="mb-4">Dashboard</h1>
      <Row>
        {(isHR || isManager) && (
          <Col md={3} sm={6} className="mb-4">
            <Card className="dashboard-card">
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="card-subtitle text-muted">
                      Total Employees
                    </h6>
                    <h2 className="card-title mb-0">{stats.totalEmployees}</h2>
                  </div>
                  <div className="card-icon bg-primary">
                    <FaUsers />
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        )}

        <Col md={3} sm={6} className="mb-4">
          <Card className="dashboard-card">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="card-subtitle text-muted">Pending Leaves</h6>
                  <h2 className="card-title mb-0">{stats.pendingLeaves}</h2>
                </div>
                <div className="card-icon bg-warning">
                  <FaHourglassHalf />
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col md={3} sm={6} className="mb-4">
          <Card className="dashboard-card">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="card-subtitle text-muted">Approved Leaves</h6>
                  <h2 className="card-title mb-0">{stats.approvedLeaves}</h2>
                </div>
                <div className="card-icon bg-success">
                  <FaCheckCircle />
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col md={3} sm={6} className="mb-4">
          <Card className="dashboard-card">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="card-subtitle text-muted">All Leaves</h6>
                  <h2 className="card-title mb-0">
                    {stats.pendingLeaves +
                      stats.approvedLeaves +
                      stats.rejectedLeaves}
                  </h2>
                </div>
                <div className="card-icon bg-info">
                  <FaCalendarAlt />
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col md={12}>
          <Card>
            <Card.Header>
              <h5 className="mb-0">Welcome to Employee Management System</h5>
            </Card.Header>
            <Card.Body>
              <p>
                This dashboard provides an overview of the system. Use the
                sidebar navigation to access different features.
              </p>
              <ul>
                {isHR && (
                  <>
                    <li>Manage employee records</li>
                    <li>Handle leave requests</li>
                    <li>Generate reports</li>
                  </>
                )}
                {isManager && !isHR && (
                  <>
                    <li>View your team members</li>
                    <li>Approve or reject leave requests</li>
                  </>
                )}
                {!isHR && !isManager && (
                  <>
                    <li>View your profile</li>
                    <li>Apply for leave</li>
                    <li>Check leave request status</li>
                  </>
                )}
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
