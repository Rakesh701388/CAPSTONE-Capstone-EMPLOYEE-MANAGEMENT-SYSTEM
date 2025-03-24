
import api from './api';

export const employeeService = {
  getAllEmployees: async () => {
    try {
      console.log("Fetching all employees...");
      const response = await api.get('/employees');
      console.log("All employees response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching all employees:", error.response?.data || error.message);
      throw error;
    }
  },

  getEmployeeById: async (id) => {
    try {
      console.log(`Fetching employee with ID ${id}...`);
      const response = await api.get(`/employees/${id}`);
      console.log(`Employee ${id} response:`, response.data);
      return response.data;
    } catch (error) {
      console.error(`Error fetching employee ${id}:`, error.response?.data || error.message);
      throw error;
    }
  },

  createEmployee: async (employeeData) => {
    try {
      console.log("Creating new employee:", employeeData);
      const response = await api.post('/employees', employeeData);
      console.log("Create employee response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error creating employee:", error.response?.data || error.message);
      throw error;
    }
  },

  updateEmployee: async (id, employeeData) => {
    try {
      console.log(`Updating employee ${id}:`, employeeData);
      const response = await api.put(`/employees/${id}`, employeeData);
      console.log(`Update employee ${id} response:`, response.data);
      return response.data;
    } catch (error) {
      console.error(`Error updating employee ${id}:`, error.response?.data || error.message);
      throw error;
    }
  },

  deleteEmployee: async (id) => {
    try {
      console.log(`Deleting employee ${id}...`);
      const response = await api.delete(`/employees/${id}`);
      console.log(`Delete employee ${id} response:`, response.data);
      return response.data;
    } catch (error) {
      console.error(`Error deleting employee ${id}:`, error.response?.data || error.message);
      throw error;
    }
  },

  getEmployeesByManager: async (managerId) => {
    try {
      console.log(`Fetching employees by manager ${managerId}...`);
      const response = await api.get(`/employees/manager/${managerId}`);
      console.log(`Employees by manager ${managerId} response:`, response.data);
      return response.data;
    } catch (error) {
      console.error(`Error fetching employees by manager ${managerId}:`, error.response?.data || error.message);
      throw error;
    }
  },

  
  getProfile: async () => {
    try {
      // Get user info from local storage
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user) throw new Error('User not authenticated');
      
      console.log("Current user role:", user.role);
      
      // First attempt: try the standard profile endpoint
      console.log("Fetching employee profile...");
      try {
        const response = await api.get('/employees/profile');
        console.log("Profile response:", response.data);
        return response.data;
      } catch (profileError) {
        console.error("Profile endpoint error:", profileError.response?.status, profileError.response?.data);
        
        // If profile endpoint fails, try to get all employees and filter
        // This works especially for HR and Manager roles who might have special permissions
        console.warn("Profile endpoint failed. Attempting to get employee by user ID directly...");
        
        // Different approaches based on user role
        if (user.role === 'HR' || user.role === 'Manager') {
          // For HR and Manager, we might need to fetch all employees first
          const allEmployeesResponse = await api.get('/employees');
          console.log("All employees response:", allEmployeesResponse.data);
          
          // Find the employee matching the current user's ID
          const employees = allEmployeesResponse.data.$values || allEmployeesResponse.data || [];
          const userEmployee = Array.isArray(employees) ? 
                              employees.find(emp => emp.userId === user.id) : null;
          
          if (userEmployee) {
            console.log("Found employee by user ID:", userEmployee);
            return userEmployee;
          }
        }
        
        // If we couldn't find the profile or the approaches above didn't work
        throw new Error(`Unable to find employee profile for ${user.role} role`);
      }
    } catch (error) {
      console.error("Error fetching profile:", error.response?.data || error.message);
      throw error;
    }
  }
};

export default employeeService;