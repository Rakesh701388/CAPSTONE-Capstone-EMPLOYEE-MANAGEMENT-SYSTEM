

import api from './api';

export const leaveService = {
  getLeaveRequests: async () => {
    try {
      const response = await api.get('/leaves');
      console.log("API Response - Get Leaves:", response.data);
      return response.data;
    } catch (error) {
      console.error("API Error - Get Leaves:", error.response?.data || error.message);
      throw error;
    }
  },

  getLeaveRequestById: async (id) => {
    try {
      const response = await api.get(`/leaves/${id}`);
      console.log(`API Response - Get Leave #${id}:`, response.data);
      return response.data;
    } catch (error) {
      console.error(`API Error - Get Leave #${id}:`, error.response?.data || error.message);
      throw error;
    }
  },

  createLeaveRequest: async (leaveData) => {
    try {
      console.log('Sending leave request to API:', leaveData);
      const response = await api.post('/leaves', leaveData);
      console.log('API Response - Create Leave:', response.data);
      return response.data;
    } catch (error) {
      console.error('API Error - Create Leave:', error.response?.data || error.message);
      throw error;
    }
  },

  updateLeaveRequestStatus: async (id, status) => {
    try {
      console.log(`Updating leave #${id} status to ${status}`);
      const response = await api.put(`/leaves/${id}/status`, JSON.stringify(status));
      console.log(`API Response - Update Leave #${id}:`, response.data);
      return response.data;
    } catch (error) {
      console.error(`API Error - Update Leave #${id}:`, error.response?.data || error.message);
      throw error;
    }
  }
};

export default leaveService;