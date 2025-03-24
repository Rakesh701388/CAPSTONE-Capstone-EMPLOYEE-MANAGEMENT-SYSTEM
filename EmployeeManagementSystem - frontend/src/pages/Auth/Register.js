import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Form,
  Button,
  Card,
  Container,
  Row,
  Col,
  Alert,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { register, reset } from "../../store/authSlice";
import { toast } from "react-toastify";
import "../../styles/auth.css";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isLoading, isSuccess, isError, errorMessage } = useSelector(
    (state) => state.auth
  );

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    role: "Employee",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    department: "",
    position: "",
    joinDate: new Date().toISOString().split("T")[0],
    isActive: true,
  });

  useEffect(() => {
    if (isSuccess) {
      toast.success("Registration successful!");
      navigate("/login");
    }

    return () => {
      dispatch(reset());
    };
  }, [isSuccess, navigate, dispatch]);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(register(formData));
  };

  return (
    <Container className="auth-container">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="auth-card">
            <Card.Header className="text-center">
              <h2>Employee Management System</h2>
              <h4>Register New Employee</h4>
            </Card.Header>
            <Card.Body>
              {isError && <Alert variant="danger">{errorMessage}</Alert>}
              <Form onSubmit={onSubmit}>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Username</Form.Label>
                      <Form.Control
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={onChange}
                        placeholder="Enter username"
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={onChange}
                        placeholder="Enter password"
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>

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
                      <Form.Label>Role</Form.Label>
                      <Form.Select
                        name="role"
                        value={formData.role}
                        onChange={onChange}
                        required
                      >
                        <option value="Employee">Employee</option>
                        <option value="Manager">Manager</option>
                        <option value="HR">HR</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
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
                </Row>

                <Button
                  variant="primary"
                  type="submit"
                  className="w-100 mt-3"
                  disabled={isLoading}
                >
                  {isLoading ? "Registering..." : "Register"}
                </Button>
              </Form>
            </Card.Body>
            <Card.Footer className="text-center">
              <p>
                Already have an account? <Link to="/login">Login here</Link>
              </p>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
