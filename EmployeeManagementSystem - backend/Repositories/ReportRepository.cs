using EmployeeManagementSystem.Data;
using EmployeeManagementSystem.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EmployeeManagementSystem.Repositories
{
    public class ReportRepository :IReportRepository
    {
        private readonly EmployeeManagementDbContext _context;

        public ReportRepository(EmployeeManagementDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Employee>> GetAllEmployeesWithDetailsAsync()
        {
            return await _context.Employees
                .Include(e => e.User)
                .Include(e => e.Manager)
                .Include(e => e.LeaveRequests)
                .ToListAsync();
        }

        public async Task<IEnumerable<LeaveRequest>> GetAllLeaveRequestsAsync(DateTime? startDate = null, DateTime? endDate = null)
        {
            var query = _context.LeaveRequests
                .Include(lr => lr.Employee)
                .Include(lr => lr.ApprovedBy)
                .AsQueryable();

            if (startDate.HasValue)
                query = query.Where(lr => lr.StartDate >= startDate.Value);

            if (endDate.HasValue)
                query = query.Where(lr => lr.EndDate <= endDate.Value);

            return await query.ToListAsync();
        }

        public async Task<Dictionary<string, int>> GetEmployeesByDepartmentAsync()
        {
            // Since Department is a string property rather than a relation
            var result = await _context.Employees
                .Where(e => e.IsActive)
                .GroupBy(e => e.Department)
                .Select(g => new { Department = g.Key, Count = g.Count() })
                .ToDictionaryAsync(x => x.Department ?? "Unassigned", x => x.Count);

            return result;
        }

        public async Task<Dictionary<string, int>> GetLeaveStatisticsByTypeAsync(DateTime? startDate = null, DateTime? endDate = null)
        {
            var query = _context.LeaveRequests.AsQueryable();

            if (startDate.HasValue)
                query = query.Where(lr => lr.StartDate >= startDate.Value);

            if (endDate.HasValue)
                query = query.Where(lr => lr.EndDate <= endDate.Value);

            var result = await query
                .GroupBy(lr => lr.LeaveType)
                .Select(g => new { LeaveType = g.Key, Count = g.Count() })
                .ToDictionaryAsync(x => x.LeaveType, x => x.Count);

            return result;
        }

        public async Task<Dictionary<string, double>> GetAverageLeavesByDepartmentAsync(int year)
        {
            var startDate = new DateTime(year, 1, 1);
            var endDate = new DateTime(year, 12, 31);

            // First, get all approved leave requests in the given year
            var leaveRequests = await _context.LeaveRequests
                .Include(lr => lr.Employee)
                .Where(lr => lr.StartDate >= startDate && lr.EndDate <= endDate && lr.Status == "Approved")
                .ToListAsync();

            // Group by department and calculate averages
            var departmentGroups = leaveRequests
                .GroupBy(lr => lr.Employee.Department ?? "Unassigned")
                .Select(g => new
                {
                    Department = g.Key,
                    TotalDays = g.Sum(lr => (lr.EndDate - lr.StartDate).TotalDays + 1),
                    EmployeeCount = g.Select(lr => lr.EmployeeId).Distinct().Count()
                })
                .ToList();

            return departmentGroups.ToDictionary(
                d => d.Department,
                d => Math.Round(d.TotalDays / d.EmployeeCount, 2)
            );
        }
    }
}
