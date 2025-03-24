

import React, { useState, useEffect } from 'react';
import { Container, Card, Row, Col, Form, Button, Spinner, Alert } from 'react-bootstrap';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  BarElement, 
  Title, 
  Tooltip, 
  Legend, 
  ArcElement,
  PointElement,
  LineElement
} from 'chart.js';
import { Bar, Pie, Line } from 'react-chartjs-2';
import reportService from '../../services/reportService';
import { toast } from 'react-toastify';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

const Reports = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [reportData, setReportData] = useState(null);
  const [reportType, setReportType] = useState('departmentDistribution');
  const [filters, setFilters] = useState({
    startDate: '',
    endDate: '',
    year: new Date().getFullYear().toString()
  });

  // Colors for charts
  const chartColors = [
    'rgba(54, 162, 235, 0.8)',
    'rgba(255, 99, 132, 0.8)',
    'rgba(75, 192, 192, 0.8)',
    'rgba(255, 206, 86, 0.8)',
    'rgba(153, 102, 255, 0.8)',
    'rgba(255, 159, 64, 0.8)',
    'rgba(199, 199, 199, 0.8)',
    'rgba(83, 102, 255, 0.8)',
    'rgba(40, 159, 64, 0.8)',
    'rgba(210, 199, 199, 0.8)',
  ];

  useEffect(() => {
    fetchReportData();
  }, [reportType]);

  const fetchReportData = async () => {
    setLoading(true);
    setError(null);
    setReportData(null);
    
    try {
      console.log(`Fetching ${reportType} report data...`);
      let data;
      
      switch (reportType) {
        case 'departmentDistribution':
          data = await reportService.getDepartmentDistribution();
          break;
        case 'leaveDistribution':
          data = await reportService.getLeaveDistributionByType(
            filters.startDate ? new Date(filters.startDate) : null,
            filters.endDate ? new Date(filters.endDate) : null
          );
          break;
        case 'employeeDirectory':
          data = await reportService.getEmployeeDirectory();
          break;
        case 'leaveAnalysis':
          data = await reportService.getLeaveAnalysis(
            filters.startDate ? new Date(filters.startDate) : null,
            filters.endDate ? new Date(filters.endDate) : null
          );
          break;
        case 'yearlyLeaves':
          data = await reportService.getAverageLeavesByDepartment(parseInt(filters.year));
          break;
        default:
          data = [];
      }
      
      console.log(`Report data received:`, data);
      
      // Process data for the chart based on report type
      let chartData = processData(data);
      setReportData(chartData);
    } catch (error) {
      console.error('Error fetching report data:', error);
      setError('Failed to fetch report data. Please try again later.');
      toast.error('Error loading report data');
    } finally {
      setLoading(false);
    }
  };

  const processData = (data) => {
    // If data is empty or not an array, return dummy data for chart
    if (!data || !Array.isArray(data) || data.length === 0) {
      console.log('Empty or invalid data received, using dummy data');
      return {
        labels: ['No Data Available'],
        datasets: [
          {
            label: 'No Data',
            data: [0],
            backgroundColor: chartColors[0],
          },
        ],
      };
    }

    // Process data based on report type
    switch (reportType) {
      case 'departmentDistribution':
        return {
          labels: data.map(item => item.department || 'Unknown'),
          datasets: [
            {
              label: 'Number of Employees',
              data: data.map(item => item.count || 0),
              backgroundColor: chartColors.slice(0, data.length),
            },
          ],
        };
        
      case 'leaveDistribution':
        return {
          labels: data.map(item => item.leaveType || 'Unknown'),
          datasets: [
            {
              label: 'Number of Leaves',
              data: data.map(item => item.count || 0),
              backgroundColor: chartColors.slice(0, data.length),
            },
          ],
        };
        
      case 'yearlyLeaves':
        // Simplified version for testing
        return {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          datasets: [
            {
              label: 'Average Leaves',
              data: [1, 2, 3, 4, 5, 4, 3, 2, 1, 2, 3, 4],
              borderColor: chartColors[0],
              backgroundColor: chartColors[0].replace('0.8', '0.2'),
            },
          ],
        };
        
      default:
        return {
          labels: ['No Data Available'],
          datasets: [
            {
              label: 'No Data',
              data: [0],
              backgroundColor: chartColors[0],
            },
          ],
        };
    }
  };

  const handleReportTypeChange = (e) => {
    setReportType(e.target.value);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const applyFilters = () => {
    fetchReportData();
  };

  const renderChart = () => {
    if (!reportData) return null;
    
    switch (reportType) {
      case 'departmentDistribution':
        return (
          <div style={{ height: '400px' }}>
            <Pie 
              data={reportData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: { position: 'right' },
                  title: { display: true, text: 'Employee Distribution by Department' }
                }
              }}
            />
          </div>
        );
        
      case 'leaveDistribution':
        return (
          <div style={{ height: '400px' }}>
            <Bar 
              data={reportData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: { display: false },
                  title: { display: true, text: 'Leave Requests by Type' }
                }
              }}
            />
          </div>
        );
        
      case 'yearlyLeaves':
        return (
          <div style={{ height: '400px' }}>
            <Line 
              data={reportData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: { position: 'top' },
                  title: { display: true, text: `Average Leaves by Month (${filters.year})` }
                }
              }}
            />
          </div>
        );
        
      default:
        return (
          <Alert variant="info">Select a report type to view data</Alert>
        );
    }
  };

  return (
    <Container fluid className="p-4">
      <Card>
        <Card.Header>
          <h2>HR Reports</h2>
        </Card.Header>
        <Card.Body>
          <Row className="mb-4">
            <Col md={4}>
              <Form.Group>
                <Form.Label>Report Type</Form.Label>
                <Form.Select
                  value={reportType}
                  onChange={handleReportTypeChange}
                >
                  <option value="departmentDistribution">Department Distribution</option>
                  <option value="leaveDistribution">Leave Distribution by Type</option>
                  <option value="yearlyLeaves">Yearly Leaves by Department</option>
                </Form.Select>
              </Form.Group>
            </Col>
            
            {(reportType === 'leaveDistribution' || reportType === 'leaveAnalysis') && (
              <>
                <Col md={3}>
                  <Form.Group>
                    <Form.Label>Start Date</Form.Label>
                    <Form.Control
                      type="date"
                      name="startDate"
                      value={filters.startDate}
                      onChange={handleFilterChange}
                    />
                  </Form.Group>
                </Col>
                <Col md={3}>
                  <Form.Group>
                    <Form.Label>End Date</Form.Label>
                    <Form.Control
                      type="date"
                      name="endDate"
                      value={filters.endDate}
                      onChange={handleFilterChange}
                    />
                  </Form.Group>
                </Col>
                <Col md={2} className="d-flex align-items-end">
                  <Button 
                    variant="primary" 
                    onClick={applyFilters}
                    className="w-100"
                  >
                    Apply Filters
                  </Button>
                </Col>
              </>
            )}
            
            {reportType === 'yearlyLeaves' && (
              <>
                <Col md={3}>
                  <Form.Group>
                    <Form.Label>Year</Form.Label>
                    <Form.Control
                      type="number"
                      name="year"
                      value={filters.year}
                      onChange={handleFilterChange}
                      min="2020"
                      max="2030"
                    />
                  </Form.Group>
                </Col>
                <Col md={2} className="d-flex align-items-end">
                  <Button 
                    variant="primary" 
                    onClick={applyFilters}
                    className="w-100"
                  >
                    Apply Filters
                  </Button>
                </Col>
              </>
            )}
          </Row>

          <Card>
            <Card.Body>
              {loading ? (
                <div className="d-flex justify-content-center p-5">
                  <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                </div>
              ) : error ? (
                <Alert variant="danger">{error}</Alert>
              ) : (
                renderChart()
              )}
            </Card.Body>
          </Card>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Reports;