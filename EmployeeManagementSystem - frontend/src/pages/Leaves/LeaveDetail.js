import React, { useEffect } from "react";
import {
  Container,
  Card,
  Row,
  Col,
  Button,
  Badge,
  Spinner,
} from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getLeaveRequestById,
  updateLeaveRequestStatus,
  reset,
} from "../../store/leaveSlice";
import { toast } from "react-toastify";
import authService from "../../services/authService";
import moment from "moment";
import {
  FaCalendarAlt,
  FaUser,
  FaComment,
  FaCheck,
  FaTimes,
} from "react-icons/fa";

const LeaveDetail = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { leave, isLoading, isError, errorMessage } = useSelector(
    (state) => state.leaves
  );
  const user = authService.getCurrentUser();
  const isHR = user?.role === "HR";
  const isManager = user?.role === "Manager";

  useEffect(() => {
    dispatch(getLeaveRequestById(id));
    return () => {
      dispatch(reset());
    };
  }, [dispatch, id]);

  useEffect(() => {
    if (isError) {
      toast.error(errorMessage);
      navigate("/leaves");
    }
  }, [isError, errorMessage, navigate]);

  const handleApprove = () => {
    dispatch(updateLeaveRequestStatus({ id, status: "Approved" }))
      .unwrap()
      .then(() => {
        toast.success("Leave request approved");
      })
      .catch(() => {
        toast.error("Failed to approve leave request");
      });
  };

  const handleReject = () => {
    dispatch(updateLeaveRequestStatus({ id, status: "Rejected" }))
      .unwrap()
      .then(() => {
        toast.success("Leave request rejected");
      })
      .catch(() => {
        toast.error("Failed to reject leave request");
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

  if (isLoading || !leave) {
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

  const leaveDuration =
    moment(leave.endDate).diff(moment(leave.startDate), "days") + 1;

  return (
    <Container fluid className="p-4">
      <Card>
        <Card.Header>
          <div className="d-flex justify-content-between align-items-center">
            <h2>Leave Request Details</h2>
            <Button variant="secondary" onClick={() => navigate("/leaves")}>
              Back to List
            </Button>
          </div>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col md={12} className="mb-4">
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <h3>Leave Request #{leave.id}</h3>
                  <Badge
                    bg={getBadgeVariant(leave.status)}
                    className="mt-2"
                    style={{ fontSize: "1rem" }}
                  >
                    {leave.status}
                  </Badge>
                </div>
                {(isHR || isManager) && leave.status === "Pending" && (
                  <div>
                    <Button
                      variant="success"
                      className="me-2"
                      onClick={handleApprove}
                    >
                      <FaCheck className="me-2" /> Approve
                    </Button>
                    <Button variant="danger" onClick={handleReject}>
                      <FaTimes className="me-2" /> Reject
                    </Button>
                  </div>
                )}
              </div>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Card className="mb-4">
                <Card.Header>
                  <h5 className="mb-0">Leave Information</h5>
                </Card.Header>
                <Card.Body>
                  <p>
                    <FaUser className="me-2 text-primary" />
                    <strong>Employee:</strong>{" "}
                    {leave.employee
                      ? `${leave.employee.firstName} ${leave.employee.lastName}`
                      : "N/A"}
                  </p>
                  <p>
                    <strong>Leave Type:</strong> {leave.leaveType}
                  </p>
                  <p>
                    <FaCalendarAlt className="me-2 text-primary" />
                    <strong>Start Date:</strong>{" "}
                    {moment(leave.startDate).format("MM/DD/YYYY")}
                  </p>
                  <p>
                    <FaCalendarAlt className="me-2 text-primary" />
                    <strong>End Date:</strong>{" "}
                    {moment(leave.endDate).format("MM/DD/YYYY")}
                  </p>
                  <p>
                    <strong>Duration:</strong> {leaveDuration} day
                    {leaveDuration !== 1 ? "s" : ""}
                  </p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6}>
              <Card className="mb-4">
                <Card.Header>
                  <h5 className="mb-0">Additional Information</h5>
                </Card.Header>
                <Card.Body>
                  <p>
                    <FaComment className="me-2 text-primary" />
                    <strong>Reason:</strong>
                  </p>
                  <p className="border p-3 rounded bg-light">{leave.reason}</p>

                  {leave.comments && (
                    <>
                      <p className="mt-3">
                        <FaComment className="me-2 text-primary" />
                        <strong>Comments:</strong>
                      </p>
                      <p className="border p-3 rounded bg-light">
                        {leave.comments}
                      </p>
                    </>
                  )}

                  {leave.status !== "Pending" && (
                    <p className="mt-3">
                      <strong>Reviewed by:</strong>{" "}
                      {leave.approvedBy
                        ? `${leave.approvedBy.firstName} ${leave.approvedBy.lastName}`
                        : "N/A"}
                    </p>
                  )}
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default LeaveDetail;
