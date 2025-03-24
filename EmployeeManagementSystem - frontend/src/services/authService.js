import api from "./api";

export const authService = {
  login: async (credentials) => {
    try {
      const response = await api.post("/auth/login", credentials);
      if (response.data) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem(
          "user",
          JSON.stringify({
            id: response.data.userId,
            username: response.data.username,
            role: response.data.role,
          })
        );
      }
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  register: async (userData) => {
    try {
      const response = await api.post("/auth/register", userData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  logout: () => {
    // Clear all authentication data
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    sessionStorage.clear(); // Clear any session storage as well
    
    // Redirect to login page
    window.location.href = '/login';
  },

  getCurrentUser: () => {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      return JSON.parse(userStr);
    }
    return null;
  },

  isAuthenticated: () => {
    return !!localStorage.getItem("token");
  },

  getToken: () => {
    return localStorage.getItem("token");
  },

  hasRole: (requiredRole) => {
    const user = authService.getCurrentUser();
    if (!user) return false;
    return user.role === requiredRole;
  },

  isHR: () => {
    return authService.hasRole("HR");
  },

  isManager: () => {
    return authService.hasRole("Manager");
  },

  isEmployee: () => {
    return authService.hasRole("Employee");
  },
};

export default authService;