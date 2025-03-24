

import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/index.css';

// Layout Components
import Navbar from './components/Layout/Navbar';
import Sidebar from './components/Layout/Sidebar';

// Auth Pages
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';

// Dashboard Pages
import Dashboard from './pages/Dashboard/Dashboard';

// Employee Pages
import EmployeeList from './pages/Employees/EmployeeList';
import EmployeeForm from './pages/Employees/EmployeeForm';
import EmployeeDetail from './pages/Employees/EmployeeDetail';

// Leave Pages
import LeaveList from './pages/Leaves/LeaveList';
import LeaveForm from './pages/Leaves/LeaveForm';
import LeaveDetail from './pages/Leaves/LeaveDetail';

// Report Pages
import Reports from './pages/Reports/Reports';

// Profile Pages
import Profile from './pages/Profile/Profile';

// Auth Guard
import PrivateRoute from './components/Auth/PrivateRoute';
import RoleRoute from './components/Auth/RoleRoute';

function App() {
  return (
    <Router>
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/logout" element={<Navigate to="/login" replace />} />
        
        {/* Dashboard Route */}
        <Route path="/" element={
          <PrivateRoute>
            <div className="app-layout">
              <Sidebar />
              <div className="content-container">
                <Navbar />
                <Dashboard />
              </div>
            </div>
          </PrivateRoute>
        } />
        
        {/* Employee Routes */}
        <Route path="/employees" element={
          <RoleRoute roles={['HR', 'Manager']}>
            <div className="app-layout">
              <Sidebar />
              <div className="content-container">
                <Navbar />
                <EmployeeList />
              </div>
            </div>
          </RoleRoute>
        } />
        
        <Route path="/employees/create" element={
          <RoleRoute roles={['HR']}>
            <div className="app-layout">
              <Sidebar />
              <div className="content-container">
                <Navbar />
                <EmployeeForm />
              </div>
            </div>
          </RoleRoute>
        } />
        
        <Route path="/employees/:id" element={
          <PrivateRoute>
            <div className="app-layout">
              <Sidebar />
              <div className="content-container">
                <Navbar />
                <EmployeeDetail />
              </div>
            </div>
          </PrivateRoute>
        } />
        
        {/* Leave Routes */}
        <Route path="/leaves" element={
          <PrivateRoute>
            <div className="app-layout">
              <Sidebar />
              <div className="content-container">
                <Navbar />
                <LeaveList />
              </div>
            </div>
          </PrivateRoute>
        } />
        
        <Route path="/leaves/create" element={
          <PrivateRoute>
            <div className="app-layout">
              <Sidebar />
              <div className="content-container">
                <Navbar />
                <LeaveForm />
              </div>
            </div>
          </PrivateRoute>
        } />
        
        <Route path="/leaves/:id" element={
          <PrivateRoute>
            <div className="app-layout">
              <Sidebar />
              <div className="content-container">
                <Navbar />
                <LeaveDetail />
              </div>
            </div>
          </PrivateRoute>
        } />
        
        {/* Report Routes */}
        <Route path="/reports" element={
          <RoleRoute roles={['HR']}>
            <div className="app-layout">
              <Sidebar />
              <div className="content-container">
                <Navbar />
                <Reports />
              </div>
            </div>
          </RoleRoute>
        } />
        
        {/* Profile Routes */}
        <Route path="/profile" element={
          <PrivateRoute>
            <div className="app-layout">
              <Sidebar />
              <div className="content-container">
                <Navbar />
                <Profile />
              </div>
            </div>
          </PrivateRoute>
        } />
        
        {/* Redirect to dashboard if route doesn't exist */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;