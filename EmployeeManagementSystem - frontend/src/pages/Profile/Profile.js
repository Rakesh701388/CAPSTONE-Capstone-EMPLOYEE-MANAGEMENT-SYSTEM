import React, { useState, useEffect } from "react";
import {
  Container,
  Card,
  Row,
  Col,
  Form,
  Button,
  Alert,
  Spinner,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getProfile, updateEmployee, reset } from "../../store/employeeSlice";
import { toast } from "react-toastify";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaBuilding,
} from "react-icons/fa";

const Profile = () => {
  const dispatch = useDispatch();
  const { profile, isLoading, isSuccess, isError, errorMessage } = useSelector(
    (state) => state.employees
  );

  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    address: "",
  });

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    dispatch(getProfile());
    return () => {
      dispatch(reset());
    };
  }, [dispatch]);

  useEffect(() => {
    if (profile) {
      setFormData({
        email: profile.email || "",
        phone: profile.phone || "",
        address: profile.address || "",
      });
    }
  }, [profile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (profile) {
      const updatedProfile = {
        ...profile,
        ...formData,
      };

      dispatch(updateEmployee({ id: profile.id, employeeData: updatedProfile }))
        .unwrap()
        .then(() => {
          toast.success("Profile updated successfully");
          setIsEditing(false);
        })
        .catch(() => {
          toast.error("Failed to update profile");
        });
    }
  };

  if (isLoading || !profile) {
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
      <Row>
        <Col lg={4} md={5}>
          <Card className="mb-4">
            <Card.Body className="text-center">
              <div
                className="rounded-circle bg-primary d-flex align-items-center justify-content-center text-white mx-auto mb-3"
                style={{ width: "120px", height: "120px", fontSize: "3rem" }}
              >
                {profile.firstName.charAt(0)}
                {profile.lastName.charAt(0)}
              </div>
              <h3>{`${profile.firstName} ${profile.lastName}`}</h3>
              <p className="text-muted mb-1">{profile.position}</p>
              <p className="text-muted mb-4">{profile.department}</p>
            </Card.Body>
          </Card>

          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Employee Information</Card.Title>
              <hr />
              <Row className="mb-3">
                <Col sm={3}>
                  <h6 className="mb-0">ID</h6>
                </Col>
                <Col sm={9}>
                  <p className="text-muted mb-0">{profile.id}</p>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col sm={3}>
                  <h6 className="mb-0">Join Date</h6>
                </Col>
                <Col sm={9}>
                  <p className="text-muted mb-0">
                    {profile.joinDate
                      ? new Date(profile.joinDate).toLocaleDateString()
                      : "N/A"}
                  </p>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col sm={3}>
                  <h6 className="mb-0">Status</h6>
                </Col>
                <Col sm={9}>
                  <p className="text-muted mb-0">
                    {profile.isActive ? "Active" : "Inactive"}
                  </p>
                </Col>
              </Row>
              {profile.manager && (
                <Row className="mb-3">
                  <Col sm={3}>
                    <h6 className="mb-0">Manager</h6>
                  </Col>
                  <Col sm={9}>
                    <p className="text-muted mb-0">
                      {profile.manager
                        ? `${profile.manager.firstName} ${profile.manager.lastName}`
                        : "N/A"}
                    </p>
                  </Col>
                </Row>
              )}
            </Card.Body>
          </Card>
        </Col>

        <Col lg={8} md={7}>
          <Card className="mb-4">
            <Card.Header className="d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Profile Details</h5>
              {!isEditing ? (
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => setIsEditing(true)}
                >
                  Edit
                </Button>
              ) : (
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => {
                    setIsEditing(false);
                    if (profile) {
                      setFormData({
                        email: profile.email || "",
                        phone: profile.phone || "",
                        address: profile.address || "",
                      });
                    }
                  }}
                >
                  Cancel
                </Button>
              )}
            </Card.Header>
            <Card.Body>
              {isError && <Alert variant="danger">{errorMessage}</Alert>}

              {isEditing ? (
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Enter your phone number"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="Enter your address"
                    />
                  </Form.Group>

                  <div className="d-flex justify-content-end">
                    <Button
                      variant="primary"
                      type="submit"
                      disabled={isLoading}
                    >
                      {isLoading ? "Saving..." : "Save Changes"}
                    </Button>
                  </div>
                </Form>
              ) : (
                <div>
                  <Row className="mb-3">
                    <Col sm={3} className="d-flex align-items-center">
                      <FaUser className="me-2 text-primary" />
                      <h6 className="mb-0">Full Name</h6>
                    </Col>
                    <Col sm={9}>
                      <p className="text-muted mb-0">{`${profile.firstName} ${profile.lastName}`}</p>
                    </Col>
                  </Row>
                  <hr />
                  <Row className="mb-3">
                    <Col sm={3} className="d-flex align-items-center">
                      <FaEnvelope className="me-2 text-primary" />
                      <h6 className="mb-0">Email</h6>
                    </Col>
                    <Col sm={9}>
                      <p className="text-muted mb-0">
                        {profile.email || "N/A"}
                      </p>
                    </Col>
                  </Row>
                  <hr />
                  <Row className="mb-3">
                    <Col sm={3} className="d-flex align-items-center">
                      <FaPhone className="me-2 text-primary" />
                      <h6 className="mb-0">Phone</h6>
                    </Col>
                    <Col sm={9}>
                      <p className="text-muted mb-0">
                        {profile.phone || "N/A"}
                      </p>
                    </Col>
                  </Row>
                  <hr />
                  <Row className="mb-3">
                    <Col sm={3} className="d-flex align-items-center">
                      <FaMapMarkerAlt className="me-2 text-primary" />
                      <h6 className="mb-0">Address</h6>
                    </Col>
                    <Col sm={9}>
                      <p className="text-muted mb-0">
                        {profile.address || "N/A"}
                      </p>
                    </Col>
                  </Row>
                  <hr />
                  <Row className="mb-3">
                    <Col sm={3} className="d-flex align-items-center">
                      <FaBuilding className="me-2 text-primary" />
                      <h6 className="mb-0">Department</h6>
                    </Col>
                    <Col sm={9}>
                      <p className="text-muted mb-0">
                        {profile.department || "N/A"}
                      </p>
                    </Col>
                  </Row>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
