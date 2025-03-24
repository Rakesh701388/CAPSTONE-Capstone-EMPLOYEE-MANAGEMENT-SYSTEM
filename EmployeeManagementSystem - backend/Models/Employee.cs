using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace EmployeeManagementSystem.Models
{
    public class Employee
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string FirstName { get; set; }
        [Required]
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Address { get; set; }
        public string Department { get; set; }
        public string Position { get; set; }
        public DateTime JoinDate { get; set; }
        public DateTime? TerminationDate { get; set; }
        public bool IsActive { get; set; } = true;
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public DateTime UpdatedAt { get; set; } = DateTime.Now;

        // Foreign key for User
        public int UserId { get; set; }
        [ForeignKey("UserId")]
        public User User { get; set; }

        // Foreign key for Manager (self-referencing)
        public int? ManagerId { get; set; }
        [ForeignKey("ManagerId")]
        public Employee Manager { get; set; }

        // Collection of employees managed by this employee
        [JsonIgnore]
        public ICollection<Employee> ManagedEmployees { get; set; }

        // Collection of leave requests made by this employee
        [JsonIgnore]
        public ICollection<LeaveRequest> LeaveRequests { get; set; }
    }
}
