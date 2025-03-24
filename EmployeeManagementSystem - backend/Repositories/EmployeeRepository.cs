using EmployeeManagementSystem.Data;
using EmployeeManagementSystem.Models;
using Microsoft.EntityFrameworkCore;

namespace EmployeeManagementSystem.Repositories
{
    public class EmployeeRepository : IEmployeeRepository
    {
        private readonly EmployeeManagementDbContext _context;

        public EmployeeRepository(EmployeeManagementDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Employee>> GetAllEmployeesAsync()
        {
            return await _context.Employees
                .Include(e => e.User)
                .Include(e => e.Manager)
                .ToListAsync();
        }

        public async Task<Employee> GetEmployeeByIdAsync(int id)
        {
            return await _context.Employees
                .Include(e => e.User)
                .Include(e => e.Manager)
                .FirstOrDefaultAsync(e => e.Id == id);
        }

        public async Task<Employee> GetEmployeeByUserIdAsync(int userId)
        {
            return await _context.Employees
                .Include(e => e.User)
                .Include(e => e.Manager)
                .FirstOrDefaultAsync(e => e.UserId == userId);
        }

        public async Task<IEnumerable<Employee>> GetEmployeesByManagerIdAsync(int managerId)
        {
            return await _context.Employees
                .Include(e => e.User)
                .Where(e => e.ManagerId == managerId)
                .ToListAsync();
        }

        public async Task<Employee> CreateEmployeeAsync(Employee employee)
        {
            _context.Employees.Add(employee);
            await _context.SaveChangesAsync();
            return employee;
        }

        public async Task<Employee> UpdateEmployeeAsync(Employee employee)
        {
            _context.Entry(employee).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return employee;
        }

        public async Task<bool> DeleteEmployeeAsync(int id)
        {
            var employee = await _context.Employees.FindAsync(id);
            if (employee == null)
                return false;

            _context.Employees.Remove(employee);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> EmployeeExistsAsync(int id)
        {
            return await _context.Employees.AnyAsync(e => e.Id == id);
        }
    }
}
