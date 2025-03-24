using EmployeeManagementSystem.Models;

namespace EmployeeManagementSystem.Repositories
{
    public interface ILeaveRequestRepository
    {
        Task<IEnumerable<LeaveRequest>> GetAllLeaveRequestsAsync();
        Task<LeaveRequest> GetLeaveRequestByIdAsync(int id);
        Task<IEnumerable<LeaveRequest>> GetLeaveRequestsByEmployeeIdAsync(int employeeId);
        Task<IEnumerable<LeaveRequest>> GetLeaveRequestsByManagerIdAsync(int managerId);
        Task<LeaveRequest> CreateLeaveRequestAsync(LeaveRequest leaveRequest);
        Task<LeaveRequest> UpdateLeaveRequestAsync(LeaveRequest leaveRequest);
        Task<bool> DeleteLeaveRequestAsync(int id);
        Task<bool> LeaveRequestExistsAsync(int id);
        Task<IEnumerable<LeaveRequest>> GetLeaveRequestsByApproverIdAsync(int approverId);
        

    }
}
