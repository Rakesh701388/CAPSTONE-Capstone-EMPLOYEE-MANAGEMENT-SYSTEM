using EmployeeManagementSystem.Models;
using EmployeeManagementSystem.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace EmployeeManagementSystem.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class EmployeesController : ControllerBase
    {
        private readonly IEmployeeRepository _employeeRepository;
        private readonly ILeaveRequestRepository _leaveRequestRepository;

        public EmployeesController(IEmployeeRepository employeeRepository,ILeaveRequestRepository _leaveRequestRepository)
        {
            _employeeRepository = employeeRepository;
            this._leaveRequestRepository = _leaveRequestRepository;
        }

        [HttpGet]
        [Authorize(Roles = "HR,Manager")]
        public async Task<ActionResult<IEnumerable<Employee>>> GetAllEmployees()
        {
            return Ok(await _employeeRepository.GetAllEmployeesAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Employee>> GetEmployee(int id)
        {
            // Check if user has permission to access this employee
            var currentUserId = int.Parse(User.FindFirst(ClaimTypes.Name)?.Value);
            var currentUserRole = User.FindFirst(ClaimTypes.Role)?.Value;

            if (currentUserRole != "HR")
            {
                var currentEmployee = await _employeeRepository.GetEmployeeByUserIdAsync(currentUserId);
                var requestedEmployee = await _employeeRepository.GetEmployeeByIdAsync(id);

                if (currentEmployee.Id != id &&
                    (currentUserRole != "Manager" || currentEmployee.Id != requestedEmployee?.ManagerId))
                {
                    return Forbid();
                }
            }

            var employee = await _employeeRepository.GetEmployeeByIdAsync(id);

            if (employee == null)
                return NotFound();

            return Ok(employee);
        }

        [HttpPost]
        [Authorize(Roles = "HR")]
        public async Task<ActionResult<Employee>> CreateEmployee(Employee employee)
        {
            var createdEmployee = await _employeeRepository.CreateEmployeeAsync(employee);
            return CreatedAtAction(nameof(GetEmployee), new { id = createdEmployee.Id }, createdEmployee);
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "HR")]
        public async Task<IActionResult> UpdateEmployee(int id, Employee employee)
        {
            if (id != employee.Id)
                return BadRequest();

            if (!await _employeeRepository.EmployeeExistsAsync(id))
                return NotFound();

            await _employeeRepository.UpdateEmployeeAsync(employee);
            return NoContent();
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "HR")]
        public async Task<IActionResult> DeleteEmployee(int id)
        {
            if (!await _employeeRepository.EmployeeExistsAsync(id))
                return NotFound();

            // Step 1: Remove the employee as a manager for subordinates
            var subordinates = await _employeeRepository.GetEmployeesByManagerIdAsync(id);
            foreach (var subordinate in subordinates)
            {
                subordinate.ManagerId = null;
                await _employeeRepository.UpdateEmployeeAsync(subordinate);
            }

            // Step 2: Set ApprovedById to NULL for related leave requests
            var leaveRequests = await _leaveRequestRepository.GetLeaveRequestsByApproverIdAsync(id);
            foreach (var leaveRequest in leaveRequests)
            {
                leaveRequest.ApprovedById = null;
                await _leaveRequestRepository.UpdateLeaveRequestAsync(leaveRequest);
            }

            // Step 3: Now, delete the employee
            await _employeeRepository.DeleteEmployeeAsync(id);

            return NoContent();
        }



        [HttpGet("manager/{managerId}")]
        [Authorize(Roles = "HR,Manager")]
        public async Task<ActionResult<IEnumerable<Employee>>> GetEmployeesByManager(int managerId)
        {
            // Check if user has permission to access this manager's employees
            var currentUserId = int.Parse(User.FindFirst(ClaimTypes.Name)?.Value);
            var currentUserRole = User.FindFirst(ClaimTypes.Role)?.Value;

            if (currentUserRole != "HR")
            {
                var currentEmployee = await _employeeRepository.GetEmployeeByUserIdAsync(currentUserId);

                if (currentEmployee.Id != managerId)
                {
                    return Forbid();
                }
            }

            return Ok(await _employeeRepository.GetEmployeesByManagerIdAsync(managerId));
        }

        [HttpGet("profile")]
        public async Task<ActionResult<Employee>> GetProfile()
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.Name)?.Value);
            var employee = await _employeeRepository.GetEmployeeByUserIdAsync(userId);

            if (employee == null)
                return NotFound();

            return Ok(employee);
        }
    }
}
