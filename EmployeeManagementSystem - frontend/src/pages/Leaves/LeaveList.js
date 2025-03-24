

import React, { useEffect, useState } from "react";
import {
  Container,
  Table,
  Button,
  Card,
  Row,
  Col,
  Form,
  Spinner,
  Badge,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { FaPlus, FaEye, FaCheck, FaTimes, FaSearch } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  getLeaveRequests,
  updateLeaveRequestStatus,
  reset,
} from "../../store/leaveSlice";
import { toast } from "react-toastify";
import authService from "../../services/authService";
import moment from "moment";

const LeaveList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { leaves, isLoading, isSuccess, isError, errorMessage } = useSelector(
    (state) => state.leaves
  );
  
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredLeaves, setFilteredLeaves] = useState([]);
  const [filterStatus, setFilterStatus] = useState("All");
  
  const user = authService.getCurrentUser();
  const isHR = user?.role === "HR";
  const isManager = user?.role === "Manager";

  // Reset state when component mounts
  useEffect(() => {
    dispatch(reset());
    dispatch(getLeaveRequests());
  }, [dispatch]);

  useEffect(() => {
    if (leaves) {
      console.log("Leaves data received:", leaves);
      // Handle both array formats - direct array or nested in $values
      const leaveValues = leaves.$values || leaves || [];
      setFilteredLeaves(leaveValues);
    }
  }, [leaves]);

  useEffect(() => {
    if (isError) {
      toast.error(errorMessage || "Failed to load leave requests");
    }
  }, [isError, errorMessage]);

  useEffect(() => {
    filterLeaves();
  }, [searchTerm, filterStatus, leaves]);

  const filterLeaves = () => {
    if (!leaves) return;
    
    // Handle potential undefined or missing $values
    const originalLeaves = leaves.$values || leaves || [];
    if (!Array.isArray(originalLeaves)) {
      console.error("Expected leaves to be an array, got:", originalLeaves);
      return;
    }
    
    let filtered = [...originalLeaves];
    
    // Filter by status
    if (filterStatus !== "All") {
      filtered = filtered.filter((leave) => leave.status === filterStatus);
    }
    
    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (leave) =>
          (leave.employee?.firstName + " " + leave.employee?.lastName)
            .toLowerCase()
            .includes(term) ||
          (leave.leaveType?.toLowerCase() || '').includes(term) ||
          (leave.reason?.toLowerCase() || '').includes(term)
      );
    }
    
    setFilteredLeaves(filtered);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleStatusFilter = (e) => {
    setFilterStatus(e.target.value);
  };

  const handleApplyForLeave = () => {
    // Use direct navigation instead of Link
    navigate('/leaves/create');
  };

  const handleStatusChange = (id, status) => {
    dispatch(updateLeaveRequestStatus({ id, status }))
      .unwrap()
      .then(() => {
        toast.success(`Leave request ${status.toLowerCase()}`);
      })
      .catch((err) => {
        console.error("Error updating leave status:", err);
        toast.error("Failed to update leave request");
      });
  };

  const getBadgeVariant = (status) => {
    switch (status) {
      case "Approved":
        return "success";
      case "Rejected":
        return "danger";
      case "Pending":
        return "warning";
      default:
        return "secondary";
    }
  };

  if (isLoading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "80vh" }}
      >
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  return (
    <Container fluid className="p-4">
      <Card>
        <Card.Header>
          <Row className="align-items-center">
            <Col>
              <h2 className="mb-0">Leave Management</h2>
            </Col>
            <Col xs="auto">
              <Button
                onClick={handleApplyForLeave}
                variant="primary"
                className="d-flex align-items-center"
              >
                <FaPlus className="me-2" /> Apply for Leave
              </Button>
            </Col>
          </Row>
        </Card.Header>
        <Card.Body>
          <Row className="mb-4">
            <Col md={8}>
              <Form.Group>
                <div className="position-relative">
                  <Form.Control
                    type="text"
                    placeholder="Search leaves..."
                    value={searchTerm}
                    onChange={handleSearch}
                  />
                  <FaSearch
                    style={{
                      position: "absolute",
                      right: "10px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      color: "#6c757d",
                    }}
                  />
                </div>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Select value={filterStatus} onChange={handleStatusFilter}>
                  <option value="All">All Statuses</option>
                  <option value="Pending">Pending</option>
                  <option value="Approved">Approved</option>
                  <option value="Rejected">Rejected</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <div className="table-responsive">
            <Table striped hover>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Employee</th>
                  <th>Leave Type</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(filteredLeaves) && filteredLeaves.length > 0 ? (
                  filteredLeaves.map((leave) => (
                    <tr key={leave.id}>
                      <td>{leave.id}</td>
                      <td>
                        {leave.employee
                          ? `${leave.employee.firstName} ${leave.employee.lastName}`
                          : "N/A"}
                      </td>
                      <td>{leave.leaveType}</td>
                      <td>{moment(leave.startDate).format("MM/DD/YYYY")}</td>
                      <td>{moment(leave.endDate).format("MM/DD/YYYY")}</td>
                      <td>
                        <Badge bg={getBadgeVariant(leave.status)}>
                          {leave.status}
                        </Badge>
                      </td>
                      <td>
                        <Button
                          as={Link}
                          to={`/leaves/${leave.id}`}
                          variant="info"
                          size="sm"
                          className="me-2"
                        >
                          <FaEye />
                        </Button>
                        {(isHR || isManager) && leave.status === "Pending" && (
                          <>
                            <Button
                              variant="success"
                              size="sm"
                              className="me-2"
                              onClick={() =>
                                handleStatusChange(leave.id, "Approved")
                              }
                            >
                              <FaCheck />
                            </Button>
                            <Button
                              variant="danger"
                              size="sm"
                              onClick={() =>
                                handleStatusChange(leave.id, "Rejected")
                              }
                            >
                              <FaTimes />
                            </Button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center">
                      No leave requests found
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default LeaveList;