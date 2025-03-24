using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace EmployeeManagementSystem.Models
{
    public class LeaveRequest
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public int EmployeeId { get; set; }
        [ForeignKey("EmployeeId")]
        [JsonIgnore]
        public Employee Employee { get; set; }

        [Required]
        public DateTime StartDate { get; set; }
        [Required]
        public DateTime EndDate { get; set; }
        [Required]
        public string LeaveType { get; set; } // Vacation, Sick, Personal, etc.
        [Required]
        public string Reason { get; set; }
        [Required]
        public string Status { get; set; } // Pending, Approved, Rejected

        public string? Comments { get; set; } // Comments from HR or Manager

        public int? ApprovedById { get; set; }
        [ForeignKey("ApprovedById")]
        [JsonIgnore]
        public Employee ApprovedBy { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public DateTime UpdatedAt { get; set; } = DateTime.Now;
    }
}
