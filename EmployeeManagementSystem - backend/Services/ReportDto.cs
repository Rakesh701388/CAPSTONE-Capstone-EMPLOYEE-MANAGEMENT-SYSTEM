namespace EmployeeManagementSystem.Services
{
    public class ReportDto
    {
        public string ReportType { get; set; }
        public DateTime GeneratedDate { get; set; }
        public object Data { get; set; }
    }

    public interface IReportService
    {
        Task<ReportDto> GetEmployeeDirectoryAsync();
        Task<ReportDto> GetLeaveAnalysisAsync(DateTime? startDate = null, DateTime? endDate = null);
        Task<ReportDto> GetDepartmentDistributionAsync();
        Task<ReportDto> GetLeaveDistributionByTypeAsync(DateTime? startDate = null, DateTime? endDate = null);
        Task<ReportDto> GetAverageLeavesByDepartmentAsync(int year);
        Task<ReportDto> GetManagerHierarchyAsync();
    }
}
