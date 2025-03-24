

import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Card, Row, Col, Alert, Spinner } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getEmployeeById, updateEmployee, reset } from '../../store/employeeSlice';
import { toast } from 'react-toastify';
import authService from '../../services/authService';

const EmployeeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { employee, isLoading, isSuccess, isError, errorMessage } = useSelector(
    (state) => state.employees
  );
  
  const user = authService.getCurrentUser();
  const isHR = user?.role === 'HR';

  const [formData, setFormData] = useState({
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    department: '',
    position: '',
    joinDate: '',
    terminationDate: '',
    isActive: true,
    userId: 0,
    managerId: null
  });

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    dispatch(getEmployeeById(id));
    
    return () => {
      dispatch(reset());
    };
  }, [dispatch, id]);

  useEffect(() => {
    if (employee) {
      const employeeData = {
        ...employee,
        joinDate: employee.joinDate ? new Date(employee.joinDate).toISOString().split('T')[0] : '',
        terminationDate: employee.terminationDate ? new Date(employee.terminationDate).toISOString().split('T')[0] : ''
      };
      setFormData(employeeData);
    }
  }, [employee]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create a complete entity with all required nested objects
    const completeEmployee = {
      id: parseInt(id),
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email || '',
      phone: formData.phone || '',
      address: formData.address || '',
      department: formData.department || '',
      position: formData.position || '',
      joinDate: formData.joinDate,
      terminationDate: formData.terminationDate || null,
      isActive: formData.isActive,
      userId: formData.userId,
      managerId: formData.managerId,
      // Fully populate User with all required fields
      user: {
        id: formData.userId,
        username: formData.user?.username || "placeholder",
        passwordHash: formData.user?.passwordHash || "placeholder",
        role: formData.user?.role || "Employee",
        employee: null // This creates a circular reference, but we'll set it to null
      },
      // Initialize empty collections or null references
      manager: null,
      managedEmployees: [],
      leaveRequests: []
    };
    
    dispatch(updateEmployee({ id, employeeData: completeEmployee }))
      .unwrap()
      .then(() => {
        toast.success('Employee updated successfully');
        setIsEditing(false);
        dispatch(getEmployeeById(id));
      })
      .catch((error) => {
        console.error('Update error:', error);
        toast.error('Failed to update employee: ' + (error.message || 'Unknown error'));
      });
  };

  if (isLoading && !employee) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '80vh' }}>
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
          <div className="d-flex justify-content-between align-items-center">
            <h2>{isEditing ? 'Edit Employee' : 'Employee Details'}</h2>
            <div>
              <Button 
                variant="secondary" 
                className="me-2"
                onClick={() => navigate('/employees')}
              >
                Back to List
              </Button>
              {isHR && !isEditing && (
                <Button 
                  variant="primary"
                  onClick={() => setIsEditing(true)}
                >
                  Edit
                </Button>
              )}
            </div>
          </div>
        </Card.Header>
        <Card.Body>
          {isError && <Alert variant="danger">{errorMessage}</Alert>}
          
          {isEditing ? (
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
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
                      onChange={handleInputChange}
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
                      value={formData.email || ''}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control
                      type="text"
                      name="phone"
                      value={formData.phone || ''}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mb-3">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="text"
                  name="address"
                  value={formData.address || ''}
                  onChange={handleInputChange}
                />
              </Form.Group>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Department</Form.Label>
                    <Form.Control
                      type="text"
                      name="department"
                      value={formData.department || ''}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Position</Form.Label>
                    <Form.Control
                      type="text"
                      name="position"
                      value={formData.position || ''}
                      onChange={handleInputChange}
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
                      value={formData.joinDate || ''}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Termination Date</Form.Label>
                    <Form.Control
                      type="date"
                      name="terminationDate"
                      value={formData.terminationDate || ''}
                      onChange={handleInputChange}
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
                  onChange={handleInputChange}
                />
              </Form.Group>

              <div className="d-flex justify-content-end mt-4">
                <Button 
                  variant="secondary" 
                  type="button" 
                  className="me-2"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </Button>
                <Button 
                  variant="primary" 
                  type="submit"
                >
                  Save Changes
                </Button>
              </div>
            </Form>
          ) : (
            <div>
              <Row className="mb-3">
                <Col sm={3}>
                  <h6 className="mb-0">Employee ID</h6>
                </Col>
                <Col sm={9}>
                  <p className="text-muted mb-0">{formData.id}</p>
                </Col>
              </Row>
              <hr />
              <Row className="mb-3">
                <Col sm={3}>
                  <h6 className="mb-0">Full Name</h6>
                </Col>
                <Col sm={9}>
                  <p className="text-muted mb-0">{`${formData.firstName} ${formData.lastName}`}</p>
                </Col>
              </Row>
              <hr />
              <Row className="mb-3">
                <Col sm={3}>
                  <h6 className="mb-0">Email</h6>
                </Col>
                <Col sm={9}>
                  <p className="text-muted mb-0">{formData.email || 'N/A'}</p>
                </Col>
              </Row>
              <hr />
              <Row className="mb-3">
                <Col sm={3}>
                  <h6 className="mb-0">Phone</h6>
                </Col>
                <Col sm={9}>
                  <p className="text-muted mb-0">{formData.phone || 'N/A'}</p>
                </Col>
              </Row>
              <hr />
              <Row className="mb-3">
                <Col sm={3}>
                  <h6 className="mb-0">Address</h6>
                </Col>
                <Col sm={9}>
                  <p className="text-muted mb-0">{formData.address || 'N/A'}</p>
                </Col>
              </Row>
              <hr />
              <Row className="mb-3">
                <Col sm={3}>
                  <h6 className="mb-0">Department</h6>
                </Col>
                <Col sm={9}>
                  <p className="text-muted mb-0">{formData.department || 'N/A'}</p>
                </Col>
              </Row>
              <hr />
              <Row className="mb-3">
                <Col sm={3}>
                  <h6 className="mb-0">Position</h6>
                </Col>
                <Col sm={9}>
                  <p className="text-muted mb-0">{formData.position || 'N/A'}</p>
                </Col>
              </Row>
              <hr />
              <Row className="mb-3">
                <Col sm={3}>
                  <h6 className="mb-0">Join Date</h6>
                </Col>
                <Col sm={9}>
                  <p className="text-muted mb-0">
                    {formData.joinDate ? new Date(formData.joinDate).toLocaleDateString() : 'N/A'}
                  </p>
                </Col>
              </Row>
              <hr />
              <Row className="mb-3">
                <Col sm={3}>
                  <h6 className="mb-0">Termination Date</h6>
                </Col>
                <Col sm={9}>
                  <p className="text-muted mb-0">
                    {formData.terminationDate ? new Date(formData.terminationDate).toLocaleDateString() : 'N/A'}
                  </p>
                </Col>
              </Row>
              <hr />
              <Row className="mb-3">
                <Col sm={3}>
                  <h6 className="mb-0">Status</h6>
                </Col>
                <Col sm={9}>
                  <p className={`mb-0 ${formData.isActive ? 'text-success' : 'text-danger'}`}>
                    {formData.isActive ? 'Active' : 'Inactive'}
                  </p>
                </Col>
              </Row>
            </div>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default EmployeeDetail;