using EmployeeManagementSystem.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace EmployeeManagementSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "HR")]
    public class ReportsController : ControllerBase
    {
        private readonly IReportService _reportService;

        public ReportsController(IReportService reportService)
        {
            _reportService = reportService;
        }

        [HttpGet("employee-directory")]
        public async Task<IActionResult> GetEmployeeDirectory()
        {
            var report = await _reportService.GetEmployeeDirectoryAsync();
            return Ok(report);
        }

        [HttpGet("leave-analysis")]
        public async Task<IActionResult> GetLeaveAnalysis([FromQuery] DateTime? startDate = null, [FromQuery] DateTime? endDate = null)
        {
            var report = await _reportService.GetLeaveAnalysisAsync(startDate, endDate);
            return Ok(report);
        }

        [HttpGet("department-distribution")]
        public async Task<IActionResult> GetDepartmentDistribution()
        {
            var report = await _reportService.GetDepartmentDistributionAsync();
            return Ok(report);
        }

        [HttpGet("leave-distribution-by-type")]
        public async Task<IActionResult> GetLeaveDistributionByType([FromQuery] DateTime? startDate = null, [FromQuery] DateTime? endDate = null)
        {
            var report = await _reportService.GetLeaveDistributionByTypeAsync(startDate, endDate);
            return Ok(report);
        }

        [HttpGet("average-leaves-by-department/{year}")]
        public async Task<IActionResult> GetAverageLeavesByDepartment(int year)
        {
            var report = await _reportService.GetAverageLeavesByDepartmentAsync(year);
            return Ok(report);
        }

        [HttpGet("manager-hierarchy")]
        public async Task<IActionResult> GetManagerHierarchy()
        {
            var report = await _reportService.GetManagerHierarchyAsync();
            return Ok(report);
        }
    }
}
