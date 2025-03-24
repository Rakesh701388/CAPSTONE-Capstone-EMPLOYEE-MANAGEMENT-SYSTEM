import React, { useState, useEffect } from "react";
import {
  Container,
  Form,
  Button,
  Card,
  Row,
  Col,
  Alert,
  Spinner,
} from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getEmployeeById,
  createEmployee,
  updateEmployee,
  reset,
} from "../../store/employeeSlice";
import { toast } from "react-toastify";

const EmployeeForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const isEditMode = !!id;

  const { employee, isLoading, isSuccess, isError, errorMessage } = useSelector(
    (state) => state.employees
  );

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    department: "",
    position: "",
    joinDate: "",
    terminationDate: "",
    isActive: true,
    userId: 0,
    managerId: null,
  });

  useEffect(() => {
    if (isEditMode) {
      dispatch(getEmployeeById(id));
    }
    return () => {
      dispatch(reset());
    };
  }, [dispatch, id, isEditMode]);

  useEffect(() => {
    if (isEditMode && employee) {
      setFormData({
        ...employee,
        joinDate: employee.joinDate
          ? new Date(employee.joinDate).toISOString().split("T")[0]
          : "",
        terminationDate: employee.terminationDate
          ? new Date(employee.terminationDate).toISOString().split("T")[0]
          : "",
      });
    }
  }, [employee, isEditMode]);

  useEffect(() => {
    if (isSuccess && !isLoading) {
      toast.success(
        `Employee ${isEditMode ? "updated" : "created"} successfully`
      );
      navigate("/employees");
    }
  }, [isSuccess, isLoading, navigate, isEditMode]);

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (isEditMode) {
      dispatch(updateEmployee({ id, employeeData: formData }));
    } else {
      dispatch(createEmployee(formData));
    }
  };

  if (isLoading && isEditMode) {
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
          <h2>{isEditMode ? "Edit Employee" : "Add New Employee"}</h2>
        </Card.Header>
        <Card.Body>
          {isError && <Alert variant="danger">{errorMessage}</Alert>}

          <Form onSubmit={onSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={onChange}
                    placeholder="Enter first name"
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={onChange}
                    placeholder="Enter last name"
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={onChange}
                    placeholder="Enter email"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={onChange}
                    placeholder="Enter phone number"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                name="address"
                value={formData.address}
                onChange={onChange}
                placeholder="Enter address"
              />
            </Form.Group>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Department</Form.Label>
                  <Form.Control
                    type="text"
                    name="department"
                    value={formData.department}
                    onChange={onChange}
                    placeholder="Enter department"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Position</Form.Label>
                  <Form.Control
                    type="text"
                    name="position"
                    value={formData.position}
                    onChange={onChange}
                    placeholder="Enter position"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Join Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="joinDate"
                    value={formData.joinDate}
                    onChange={onChange}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Termination Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="terminationDate"
                    value={formData.terminationDate}
                    onChange={onChange}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                name="isActive"
                label="Active"
                checked={formData.isActive}
                onChange={onChange}
              />
            </Form.Group>

            <div className="d-flex justify-content-end mt-4">
              <Button
                variant="secondary"
                type="button"
                className="me-2"
                onClick={() => navigate("/employees")}
              >
                Cancel
              </Button>
              <Button variant="primary" type="submit" disabled={isLoading}>
                {isLoading ? "Saving..." : "Save"}
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default EmployeeForm;
