using System;
using System.ComponentModel.DataAnnotations;

namespace EmployeeManagementSystem.Models
{
    public class LoginModel
    {
        [Required]
        public string Username { get; set; }

        [Required]
        public string Password { get; set; }
    }

    public class RegisterModel
    {
        [Required]
        public string Username { get; set; }

        [Required]
        public string Password { get; set; }

        [Required]
        public string Role { get; set; }

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

        public bool IsActive { get; set; }

        public int? ManagerId { get; set; }
    }

    public class AuthResponse
    {
        public int UserId { get; set; }

        public string Username { get; set; }

        public string Token { get; set; }

        public string Role { get; set; }
    }
}
