using EmployeeManagementSystem.Models;

namespace EmployeeManagementSystem.Repositories
{
    public interface IEmployeeRepository
    {
        Task<IEnumerable<Employee>> GetAllEmployeesAsync();
        Task<Employee> GetEmployeeByIdAsync(int id);
        Task<Employee> GetEmployeeByUserIdAsync(int userId);
        Task<IEnumerable<Employee>> GetEmployeesByManagerIdAsync(int managerId);
        Task<Employee> CreateEmployeeAsync(Employee employee);
        Task<Employee> UpdateEmployeeAsync(Employee employee);
        Task<bool> DeleteEmployeeAsync(int id);
        Task<bool> EmployeeExistsAsync(int id);

    }
}
