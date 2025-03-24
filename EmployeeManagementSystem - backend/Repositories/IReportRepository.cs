using EmployeeManagementSystem.Models;

namespace EmployeeManagementSystem.Repositories
{
    public interface IReportRepository
    {
        Task<IEnumerable<Employee>> GetAllEmployeesWithDetailsAsync();
        Task<IEnumerable<LeaveRequest>> GetAllLeaveRequestsAsync(DateTime? startDate = null, DateTime? endDate = null);
        Task<Dictionary<string, int>> GetEmployeesByDepartmentAsync();
        Task<Dictionary<string, int>> GetLeaveStatisticsByTypeAsync(DateTime? startDate = null, DateTime? endDate = null);
        Task<Dictionary<string, double>> GetAverageLeavesByDepartmentAsync(int year);
    }
}
