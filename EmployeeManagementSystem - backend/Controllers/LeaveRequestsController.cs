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
    public class LeavesController : ControllerBase
    {
        private readonly ILeaveRequestRepository _leaveRequestRepository;
        private readonly IEmployeeRepository _employeeRepository;

        public LeavesController(ILeaveRequestRepository leaveRequestRepository, IEmployeeRepository employeeRepository)
        {
            _leaveRequestRepository = leaveRequestRepository;
            _employeeRepository = employeeRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<LeaveRequest>>> GetLeaveRequests()
        {
            var currentUserId = int.Parse(User.FindFirst(ClaimTypes.Name)?.Value);
            var currentUserRole = User.FindFirst(ClaimTypes.Role)?.Value;
            var currentEmployee = await _employeeRepository.GetEmployeeByUserIdAsync(currentUserId);

            if (currentUserRole == "HR")
            {
                return Ok(await _leaveRequestRepository.GetAllLeaveRequestsAsync());
            }
            else if (currentUserRole == "Manager")
            {
                return Ok(await _leaveRequestRepository.GetLeaveRequestsByManagerIdAsync(currentEmployee.Id));
            }
            else
            {
                return Ok(await _leaveRequestRepository.GetLeaveRequestsByEmployeeIdAsync(currentEmployee.Id));
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<LeaveRequest>> GetLeaveRequest(int id)
        {
            var leaveRequest = await _leaveRequestRepository.GetLeaveRequestByIdAsync(id);

            if (leaveRequest == null)
                return NotFound();

            // Check if user has permission to access this leave request
            var currentUserId = int.Parse(User.FindFirst(ClaimTypes.Name)?.Value);
            var currentUserRole = User.FindFirst(ClaimTypes.Role)?.Value;
            var currentEmployee = await _employeeRepository.GetEmployeeByUserIdAsync(currentUserId);

            if (currentUserRole != "HR" &&
                leaveRequest.EmployeeId != currentEmployee.Id &&
                (currentUserRole != "Manager" || currentEmployee.Id != leaveRequest.Employee.ManagerId))
            {
                return Forbid();
            }

            return Ok(leaveRequest);
        }

        [HttpPost]
        public async Task<ActionResult<LeaveRequest>> CreateLeaveRequest(LeaveRequest leaveRequest)
        {
            var currentUserId = int.Parse(User.FindFirst(ClaimTypes.Name)?.Value);
            var currentEmployee = await _employeeRepository.GetEmployeeByUserIdAsync(currentUserId);

            // Ensure the employee can only create leave requests for themselves
            leaveRequest.EmployeeId = currentEmployee.Id;
            leaveRequest.Status = "Pending";

            var createdLeaveRequest = await _leaveRequestRepository.CreateLeaveRequestAsync(leaveRequest);
            return CreatedAtAction(nameof(GetLeaveRequest), new { id = createdLeaveRequest.Id }, createdLeaveRequest);
        }

        [HttpPut("{id}/status")]
        [Authorize(Roles = "HR,Manager")]
        public async Task<IActionResult> UpdateLeaveRequestStatus(int id, [FromBody] string status)
        {
            var leaveRequest = await _leaveRequestRepository.GetLeaveRequestByIdAsync(id);

            if (leaveRequest == null)
                return NotFound();

            // Check if user has permission to update this leave request
            var currentUserId = int.Parse(User.FindFirst(ClaimTypes.Name)?.Value);
            var currentUserRole = User.FindFirst(ClaimTypes.Role)?.Value;
            var currentEmployee = await _employeeRepository.GetEmployeeByUserIdAsync(currentUserId);

            if (currentUserRole != "HR" &&
                (currentUserRole != "Manager" || currentEmployee.Id != leaveRequest.Employee.ManagerId))
            {
                return Forbid();
            }

            leaveRequest.Status = status;
            leaveRequest.ApprovedById = currentEmployee.Id;

            await _leaveRequestRepository.UpdateLeaveRequestAsync(leaveRequest);
            return NoContent();
        }
    }
}
