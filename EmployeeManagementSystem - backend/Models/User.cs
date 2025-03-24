using System.ComponentModel.DataAnnotations;
using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;


namespace EmployeeManagementSystem.Models
{
    public class User
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Username { get; set; }
        [Required]
        public string PasswordHash { get; set; }
        [Required]
        public string Role { get; set; } // HR, Manager, Employee
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public DateTime UpdatedAt { get; set; } = DateTime.Now;

        // One-to-One relationship with Employee
        [JsonIgnore]
        public Employee Employee { get; set; }
    }
}
