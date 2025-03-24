using EmployeeManagementSystem.Data;
using EmployeeManagementSystem.Models;
using Microsoft.EntityFrameworkCore;

namespace EmployeeManagementSystem.Repositories
{
    public class LeaveRequestRepository : ILeaveRequestRepository
    {
        private readonly EmployeeManagementDbContext _context;

        public LeaveRequestRepository(EmployeeManagementDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<LeaveRequest>> GetAllLeaveRequestsAsync()
        {
            return await _context.LeaveRequests
                .Include(l => l.Employee)
                .Include(l => l.ApprovedBy)
                .ToListAsync();
        }

        public async Task<LeaveRequest> GetLeaveRequestByIdAsync(int id)
        {
            return await _context.LeaveRequests
                .Include(l => l.Employee)
                .Include(l => l.ApprovedBy)
                .FirstOrDefaultAsync(l => l.Id == id);
        }

        public async Task<IEnumerable<LeaveRequest>> GetLeaveRequestsByEmployeeIdAsync(int employeeId)
        {
            return await _context.LeaveRequests
                .Include(l => l.Employee)
                .Include(l => l.ApprovedBy)
                .Where(l => l.EmployeeId == employeeId)
                .ToListAsync();
        }

        public async Task<IEnumerable<LeaveRequest>> GetLeaveRequestsByManagerIdAsync(int managerId)
        {
            // Get all employees under this manager
            var employeesUnderManager = await _context.Employees
                .Where(e => e.ManagerId == managerId)
                .Select(e => e.Id)
                .ToListAsync();

            // Get leave requests for those employees
            return await _context.LeaveRequests
                .Include(l => l.Employee)
                .Include(l => l.ApprovedBy)
                .Where(l => employeesUnderManager.Contains(l.EmployeeId))
                .ToListAsync();
        }

        public async Task<LeaveRequest> CreateLeaveRequestAsync(LeaveRequest leaveRequest)
        {
            _context.LeaveRequests.Add(leaveRequest);
            await _context.SaveChangesAsync();
            return leaveRequest;
        }

        public async Task<LeaveRequest> UpdateLeaveRequestAsync(LeaveRequest leaveRequest)
        {
            _context.Entry(leaveRequest).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return leaveRequest;
        }

        public async Task<bool> DeleteLeaveRequestAsync(int id)
        {
            var leaveRequest = await _context.LeaveRequests.FindAsync(id);
            if (leaveRequest == null)
                return false;

            _context.LeaveRequests.Remove(leaveRequest);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> LeaveRequestExistsAsync(int id)
        {
            return await _context.LeaveRequests.AnyAsync(l => l.Id == id);
        }
        public async Task<IEnumerable<LeaveRequest>> GetLeaveRequestsByApproverIdAsync(int approverId)
        {
            return await _context.LeaveRequests.Where(lr => lr.ApprovedById == approverId).ToListAsync();
        }

       

    }
}
