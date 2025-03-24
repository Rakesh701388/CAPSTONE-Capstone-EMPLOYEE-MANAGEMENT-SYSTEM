

import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Card, Alert, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createLeaveRequest, reset } from '../../store/leaveSlice';
import { toast } from 'react-toastify';
import moment from 'moment';

const LeaveForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, isSuccess, isError, errorMessage } = useSelector(
    (state) => state.leaves
  );

  const [formData, setFormData] = useState({
    startDate: '',
    endDate: '',
    leaveType: '',
    reason: '',
  });

  const [formErrors, setFormErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  // Reset the success state when the component mounts
  useEffect(() => {
    console.log("LeaveForm component mounted");
    dispatch(reset());
  }, [dispatch]);

  useEffect(() => {
    // Only navigate when the form has been submitted AND isSuccess is true
    if (submitted && isSuccess) {
      toast.success('Leave request submitted successfully');
      navigate('/leaves');
    }
  }, [isSuccess, navigate, submitted]);

  const validateForm = () => {
    const errors = {};
    const { startDate, endDate, leaveType, reason } = formData;

    if (!startDate) errors.startDate = 'Start date is required';
    if (!endDate) errors.endDate = 'End date is required';
    if (!leaveType) errors.leaveType = 'Leave type is required';
    if (!reason) errors.reason = 'Reason is required';

    if (startDate && endDate) {
      const start = moment(startDate);
      const end = moment(endDate);
      if (end.isBefore(start)) {
        errors.endDate = 'End date cannot be before start date';
      }
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear the error for this field when the user starts typing
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: undefined
      });
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setSubmitted(true); // Set submitted to true
      
      // Convert dates to the format expected by the backend
      const leaveRequest = {
        ...formData,
        startDate: moment(formData.startDate).format('YYYY-MM-DD'),
        endDate: moment(formData.endDate).format('YYYY-MM-DD')
      };
      
      console.log('Submitting leave request:', leaveRequest);
      dispatch(createLeaveRequest(leaveRequest));
    }
  };

  return (
    <Container fluid className="p-4">
      <Card>
        <Card.Header>
          <h2>Apply for Leave</h2>
        </Card.Header>
        <Card.Body>
          {isError && <Alert variant="danger">{errorMessage || 'Failed to submit leave request'}</Alert>}
          
          <Form onSubmit={onSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Leave Type</Form.Label>
              <Form.Select
                name="leaveType"
                value={formData.leaveType}
                onChange={onChange}
                isInvalid={!!formErrors.leaveType}
              >
                <option value="">Select Leave Type</option>
                <option value="Vacation">Vacation</option>
                <option value="Sick">Sick</option>
                <option value="Personal">Personal</option>
                <option value="Bereavement">Bereavement</option>
                <option value="Maternity/Paternity">Maternity/Paternity</option>
                <option value="Other">Other</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {formErrors.leaveType}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Start Date</Form.Label>
              <Form.Control
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={onChange}
                isInvalid={!!formErrors.startDate}
                min={moment().format('YYYY-MM-DD')} // Can't select past dates
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.startDate}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>End Date</Form.Label>
              <Form.Control
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={onChange}
                isInvalid={!!formErrors.endDate}
                min={formData.startDate || moment().format('YYYY-MM-DD')}
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.endDate}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Reason</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                name="reason"
                value={formData.reason}
                onChange={onChange}
                placeholder="Explain the reason for your leave request"
                isInvalid={!!formErrors.reason}
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.reason}
              </Form.Control.Feedback>
            </Form.Group>

            <div className="d-flex justify-content-end mt-4">
              <Button 
                variant="secondary" 
                type="button" 
                className="me-2"
                onClick={() => navigate('/leaves')}
              >
                Cancel
              </Button>
              <Button 
                variant="primary" 
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? 'Submitting...' : 'Submit Request'}
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default LeaveForm;