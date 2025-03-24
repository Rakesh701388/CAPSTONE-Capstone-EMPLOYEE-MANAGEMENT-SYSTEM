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
import { login, reset } from "../../store/authSlice";
import { toast } from "react-toastify";
import "../../styles/auth.css";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isSuccess, isError, errorMessage } = useSelector(
    (state) => state.auth
  );

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const { username, password } = formData;

  useEffect(() => {
    if (isSuccess || user) {
      navigate("/");
    }

    return () => {
      dispatch(reset());
    };
  }, [isSuccess, user, navigate, dispatch]);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(login(formData));
  };

  return (
    <Container className="auth-container">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card className="auth-card">
            <Card.Header className="text-center">
              <h2>Employee Management System</h2>
              <h4>Login</h4>
            </Card.Header>
            <Card.Body>
              {isError && <Alert variant="danger">{errorMessage}</Alert>}
              <Form onSubmit={onSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    name="username"
                    value={username}
                    onChange={onChange}
                    placeholder="Enter your username"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={password}
                    onChange={onChange}
                    placeholder="Enter your password"
                    required
                  />
                </Form.Group>

                <Button
                  variant="primary"
                  type="submit"
                  className="w-100"
                  disabled={isLoading}
                >
                  {isLoading ? "Logging in..." : "Login"}
                </Button>
              </Form>
            </Card.Body>
            <Card.Footer className="text-center">
              <p>
                Don't have an account? <Link to="/register">Register here</Link>
              </p>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
