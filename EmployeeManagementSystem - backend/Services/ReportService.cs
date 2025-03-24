using EmployeeManagementSystem.Models;
using EmployeeManagementSystem.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EmployeeManagementSystem.Services
{
    public class ReportService: IReportService
    {
        private readonly IReportRepository _reportRepository;
        private readonly IEmployeeRepository _employeeRepository;

        public ReportService(IReportRepository reportRepository, IEmployeeRepository employeeRepository)
        {
            _reportRepository = reportRepository;
            _employeeRepository = employeeRepository;
        }

        public async Task<ReportDto> GetEmployeeDirectoryAsync()
        {
            var employees = await _reportRepository.GetAllEmployeesWithDetailsAsync();

            var employeeData = employees.Select(e => new
            {
                Id = e.Id,
                Name = $"{e.FirstName} {e.LastName}",
                Email = e.Email,
                Phone = e.Phone,
                Department = e.Department,
                Position = e.Position,
                Manager = e.Manager != null ? $"{e.Manager.FirstName} {e.Manager.LastName}" : "None",
                JoinDate = e.JoinDate.ToString("yyyy-MM-dd"),
                IsActive = e.IsActive
            }).ToList();

            return new ReportDto
            {
                ReportType = "Employee Directory",
                GeneratedDate = DateTime.Now,
                Data = employeeData
            };
        }

        public async Task<ReportDto> GetLeaveAnalysisAsync(DateTime? startDate = null, DateTime? endDate = null)
        {
            var leaveRequests = await _reportRepository.GetAllLeaveRequestsAsync(startDate, endDate);

            var leaveData = leaveRequests.Select(lr => new
            {
                EmployeeName = $"{lr.Employee.FirstName} {lr.Employee.LastName}",
                Department = lr.Employee.Department,
                LeaveType = lr.LeaveType,
                StartDate = lr.StartDate.ToString("yyyy-MM-dd"),
                EndDate = lr.EndDate.ToString("yyyy-MM-dd"),
                Duration = (lr.EndDate - lr.StartDate).Days + 1,
                Reason = lr.Reason,
                Status = lr.Status,
                ApprovedBy = lr.ApprovedBy != null ? $"{lr.ApprovedBy.FirstName} {lr.ApprovedBy.LastName}" : "N/A"
            }).ToList();

            return new ReportDto
            {
                ReportType = "Leave Analysis",
                GeneratedDate = DateTime.Now,
                Data = leaveData
            };
        }

        public async Task<ReportDto> GetDepartmentDistributionAsync()
        {
            var distribution = await _reportRepository.GetEmployeesByDepartmentAsync();

            return new ReportDto
            {
                ReportType = "Department Distribution",
                GeneratedDate = DateTime.Now,
                Data = distribution
            };
        }

        public async Task<ReportDto> GetLeaveDistributionByTypeAsync(DateTime? startDate = null, DateTime? endDate = null)
        {
            var distribution = await _reportRepository.GetLeaveStatisticsByTypeAsync(startDate, endDate);

            return new ReportDto
            {
                ReportType = "Leave Distribution by Type",
                GeneratedDate = DateTime.Now,
                Data = distribution
            };
        }

        public async Task<ReportDto> GetAverageLeavesByDepartmentAsync(int year)
        {
            var averages = await _reportRepository.GetAverageLeavesByDepartmentAsync(year);

            return new ReportDto
            {
                ReportType = $"Average Leaves by Department ({year})",
                GeneratedDate = DateTime.Now,
                Data = averages
            };
        }

        public async Task<ReportDto> GetManagerHierarchyAsync()
        {
            // This is a bonus report leveraging your self-referencing manager relationship
            var employees = await _reportRepository.GetAllEmployeesWithDetailsAsync();

            // Find top-level managers (those without managers)
            var topManagers = employees.Where(e => e.ManagerId == null && e.IsActive).ToList();

            // Build hierarchy
            var hierarchy = topManagers.Select(m => BuildManagerHierarchy(m, employees)).ToList();

            return new ReportDto
            {
                ReportType = "Manager Hierarchy",
                GeneratedDate = DateTime.Now,
                Data = hierarchy
            };
        }

        private object BuildManagerHierarchy(Employee manager, IEnumerable<Employee> allEmployees)
        {
            var subordinates = allEmployees.Where(e => e.ManagerId == manager.Id && e.IsActive).ToList();

            return new
            {
                Name = $"{manager.FirstName} {manager.LastName}",
                Position = manager.Position,
                Department = manager.Department,
                Subordinates = subordinates.Select(s => BuildManagerHierarchy(s, allEmployees)).ToList()
            };
        }
    }
}
