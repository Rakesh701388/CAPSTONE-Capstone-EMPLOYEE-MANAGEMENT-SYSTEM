# CAPSTONE-Capstone-EMPLOYEE-MANAGEMENT-SYSTEM
CAPSTONE-Capstone-EMPLOYEE MANAGEMENT SYSTEM
# Employee Management System - Capstone Project

A full-stack Employee Management System that enables HR teams to manage employees, assign roles, track leave requests, and generate reports.

## Features

- User authentication with JWT and role-based access control
- Employee management (Create, Read, Update, Delete)
- Leave management (Apply, Approve/Reject, Track)
- Role-based dashboards for HR, Manager, and Employee
- Responsive UI for desktop and mobile devices

## Tech Stack

### Backend

- .NET Core Web API
- Entity Framework Core
- Microsoft SQL Server 
- JWT Authentication
- RBAC (Role-Based Access Control)

### Frontend

- React
- Redux (with Redux Toolkit)
- React Router
- Axios for API communication

## Project Structure

```
EmployeeManagementSystem/
│── backend/ # .NET Core API
│   ├── Controllers/ # API Controllers
│   ├── Models/ # Entity Models
│   ├── Services/ # Business Logic
│   ├── Repositories/ # Database Interactions
│   ├── Middleware/ # Authentication & Authorization
│   ├── EmployeeManagementDbContext # Entity Framework DB Context
│   ├── Program.cs # Entry Point
│   └── 
│── frontend/ # React Frontend
│   ├── src/
│   │   ├── components/ # Reusable Components
│   │   ├── pages/ # UI Pages
│   │   ├── store/ # Redux Store
│   │   ├── hooks/ # Custom Hooks
│   │   ├── App.js # Main App Component
│   │   └── index.js # Entry Point
│── .gitignore
│── README.md
│── package.json # Frontend Dependencies
│── docker-compose.yml # Docker Configuration
└── sql-scripts/ # Database Scripts
```

## Installation and Setup

### Prerequisites

- .NET 6 SDK
- Node.js (v14 or higher)
- SQL Server
- Docker (optional)

### Backend Setup

1. Navigate to the backend directory:

   ```
   cd backend
   ```

2. Restore NuGet packages:

   ```
   dotnet restore
   ```

3. Update the connection string in `appsettings.json`:

   ```json
   "ConnectionStrings": {
     "DefaultConnection": "Data Source=RAKESH;Integrated Security=True;Connect Timeout=30;Encrypt=False;Trust Server Certificate=False;Application Intent=ReadWrite;Multi Subnet Failover=False"
   }
   ```

4. Apply migrations to create the database:

   ```
   dotnet ef database update
   ```

5. Run the application:
   ```
   dotnet run
   ```

### Frontend Setup

1. Navigate to the frontend directory:

   ```
   cd frontend
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Create `.env` file for environment variables:

   ```
   REACT_APP_API_URL=http://localhost:5025/api
   ```

4. Start the development server:
   ```
   npm start
   ```

## API Endpoints

### Authentication Endpoints

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login and get JWT token

### Employee Management Endpoints

- `GET /api/employees` - Get all employees
- `GET /api/employees/{id}` - Get employee by ID
- `POST /api/employees` - Create new employee
- `PUT /api/employees/{id}` - Update employee
- `DELETE /api/employees/{id}` - Delete employee

### Leave Management Endpoints

- `GET /api/leaves` - Get all leaves (HR only)
- `GET /api/leaves/me` - Get current user's leaves
- `GET /api/leaves/{id}` - Get leave by ID
- `POST /api/leaves` - Apply for leave
- `PUT /api/leaves/{id}/status` - Approve/reject leave request

## User Roles and Permissions

### HR Role

- Manage all employees (CRUD operations)
- Assign roles to users
- Manage all leave requests
- Generate reports

### Manager Role

- View team members
- Approve/reject leave requests from team members
- View department statistics

### Employee Role

- View and update profile
- Apply for leave
- Track leave request status

## Database Schema

The database includes tables for:

- Users (Authentication)
- Roles
- UserRoles (Many-to-Many)
- Employees
- Leaves

## License

This project is licensed under the MIT License.

