


import api from './api';

export const reportService = {
  getEmployeeDirectory: async () => {
    try {
      console.log("Fetching employee directory...");
      const response = await api.get('/reports/employee-directory');
      console.log("Employee directory response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching employee directory:", error.response?.data || error.message);
      throw error;
    }
  },

  getLeaveAnalysis: async (startDate, endDate) => {
    try {
      let url = '/reports/leave-analysis';
      
      // Add query parameters if provided
      if (startDate || endDate) {
        url += '?';
        if (startDate) {
          url += `startDate=${startDate.toISOString()}`;
        }
        if (endDate) {
          url += startDate ? `&endDate=${endDate.toISOString()}` : `endDate=${endDate.toISOString()}`;
        }
      }
      
      console.log(`Fetching leave analysis with URL: ${url}`);
      const response = await api.get(url);
      console.log("Leave analysis response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching leave analysis:", error.response?.data || error.message);
      throw error;
    }
  },

  getDepartmentDistribution: async () => {
    try {
      console.log("Fetching department distribution...");
      const response = await api.get('/reports/department-distribution');
      console.log("Department distribution response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching department distribution:", error.response?.data || error.message);
      throw error;
    }
  },

  getLeaveDistributionByType: async (startDate, endDate) => {
    try {
      let url = '/reports/leave-distribution-by-type';
      
      // Add query parameters if provided
      if (startDate || endDate) {
        url += '?';
        if (startDate) {
          url += `startDate=${startDate.toISOString()}`;
        }
        if (endDate) {
          url += startDate ? `&endDate=${endDate.toISOString()}` : `endDate=${endDate.toISOString()}`;
        }
      }
      
      console.log(`Fetching leave distribution by type with URL: ${url}`);
      const response = await api.get(url);
      console.log("Leave distribution response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching leave distribution:", error.response?.data || error.message);
      throw error;
    }
  },

  getAverageLeavesByDepartment: async (year) => {
    try {
      console.log(`Fetching average leaves by department for year ${year}`);
      const response = await api.get(`/reports/average-leaves-by-department/${year}`);
      console.log("Average leaves response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching average leaves:", error.response?.data || error.message);
      throw error;
    }
  },

  getManagerHierarchy: async () => {
    try {
      console.log("Fetching manager hierarchy...");
      const response = await api.get('/reports/manager-hierarchy');
      console.log("Manager hierarchy response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching manager hierarchy:", error.response?.data || error.message);
      throw error;
    }
  }
};

export default reportService;