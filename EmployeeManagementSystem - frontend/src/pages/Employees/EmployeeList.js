
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
import { Link } from "react-router-dom";
import { FaPlus, FaEdit, FaTrash, FaSearch } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllEmployees,
  deleteEmployee,
  reset,
} from "../../store/employeeSlice";
import { toast } from "react-toastify";
import authService from "../../services/authService";

const EmployeeList = () => {
  const dispatch = useDispatch();
  const { employees, isLoading, isSuccess, isError, errorMessage } =
    useSelector((state) => state.employees);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const user = authService.getCurrentUser();
  const isHR = user?.role === "HR";

  useEffect(() => {
    dispatch(getAllEmployees());
    return () => {
      dispatch(reset());
    };
  }, [dispatch]);

  useEffect(() => {
    if (isSuccess && employees) {
      // Handle both formats - direct array or nested in $values
      const employeeArray = employees?.$values || employees || [];
      setFilteredEmployees(employeeArray);
    }
  }, [isSuccess, employees]);

  useEffect(() => {
    if (isError) {
      toast.error(errorMessage);
    }
  }, [isError, errorMessage]);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    // Safely handle filtering even if employees is undefined or lacks $values
    const employeeArray = employees?.$values || employees || [];
    const filtered = employeeArray.filter(
      (employee) =>
        (employee.firstName?.toLowerCase() || '').includes(value) ||
        (employee.lastName?.toLowerCase() || '').includes(value) ||
        (employee.email?.toLowerCase() || '').includes(value) ||
        (employee.department?.toLowerCase() || '').includes(value) ||
        (employee.position?.toLowerCase() || '').includes(value)
    );

    setFilteredEmployees(filtered);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      dispatch(deleteEmployee(id))
        .unwrap()
        .then(() => {
          toast.success("Employee deleted successfully");
        })
        .catch((error) => {
          console.log(error);
          toast.error("Failed to delete employee");
        });
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
              <h2 className="mb-0">Employee Management</h2>
            </Col>
            <Col xs="auto">
              {isHR && (
                <Button
                  as={Link}
                  to="/employees/create"
                  variant="primary"
                  className="d-flex align-items-center"
                >
                  <FaPlus className="me-2" /> Add Employee
                </Button>
              )}
            </Col>
          </Row>
        </Card.Header>
        <Card.Body>
          <Form className="mb-4">
            <Form.Group>
              <div className="position-relative">
                <Form.Control
                  type="text"
                  placeholder="Search employees..."
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
          </Form>

          <div className="table-responsive">
            <Table striped hover>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Department</th>
                  <th>Position</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredEmployees && filteredEmployees.length > 0 ? (
                  filteredEmployees.map((employee) => (
                    <tr key={employee.id}>
                      <td>{employee.id}</td>
                      <td>{`${employee.firstName} ${employee.lastName}`}</td>
                      <td>{employee.email}</td>
                      <td>{employee.department}</td>
                      <td>{employee.position}</td>
                      <td>
                        <Badge bg={employee.isActive ? "success" : "danger"}>
                          {employee.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </td>
                      <td>
                        <Button
                          as={Link}
                          to={`/employees/${employee.id}`}
                          variant="info"
                          size="sm"
                          className="me-2"
                        >
                          <FaEdit />
                        </Button>
                        {isHR && (
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() => handleDelete(employee.id)}
                          >
                            <FaTrash />
                          </Button>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center">
                      No employees found
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

export default EmployeeList;