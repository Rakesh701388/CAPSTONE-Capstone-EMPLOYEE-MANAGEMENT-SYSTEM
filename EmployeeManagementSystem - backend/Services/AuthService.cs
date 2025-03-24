using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using EmployeeManagementSystem.Data;
using EmployeeManagementSystem.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.Security.Cryptography;

namespace EmployeeManagementSystem.Services
{
    public class AuthService : IAuthService
    {
        private readonly EmployeeManagementDbContext _context;
        private readonly IConfiguration _configuration;

        public AuthService(EmployeeManagementDbContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        public async Task<AuthResponse> Login(LoginModel model)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Username == model.Username);

            if (user == null )
                return null;

            return new AuthResponse
            {
                UserId = user.Id,
                Username = user.Username,
                Role = user.Role,
                Token = GenerateJwtToken(user)
            };
        }

        public async Task<AuthResponse> Register(RegisterModel model)
        {
            if (await _context.Users.AnyAsync(u => u.Username == model.Username))
                return null;

            var user = new User
            {
                Username = model.Username,
                PasswordHash = HashPassword(model.Password),
                Role = model.Role
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            var employee = new Employee
            {
                UserId = user.Id,
                FirstName = model.FirstName,
                LastName = model.LastName,
                Email = model.Email ?? "default@example.com",
                Phone = model.Phone ?? "+1000000000",
                Address = model.Address ?? "Default Address",
                Department = model.Department ?? "General",
                Position = model.Position ?? "Employee",
                JoinDate = DateTime.Now,
                TerminationDate = null,
                IsActive = true,
                CreatedAt = DateTime.Now,
                UpdatedAt = DateTime.Now,
                ManagerId = model.ManagerId,
                LeaveRequests = new List<LeaveRequest>(),
                ManagedEmployees = new List<Employee>()
            };


            _context.Employees.Add(employee);
            await _context.SaveChangesAsync();

            return new AuthResponse
            {
                UserId = user.Id,
                Username = user.Username,
                Role = user.Role,
                Token = GenerateJwtToken(user)
            };
        }

        public string GenerateJwtToken(User user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_configuration["Jwt:Key"]);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
            new Claim(ClaimTypes.Name, user.Id.ToString()),
            new Claim(ClaimTypes.Role, user.Role)
        }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature),
                Issuer = _configuration["Jwt:Issuer"],     // Add this line
                Audience = _configuration["Jwt:Audience"]  // Add this line
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        private string HashPassword(string password)
        {
            using (var sha256 = SHA256.Create())
            {
                var hashedBytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
                return BitConverter.ToString(hashedBytes).Replace("-", "").ToLower();
            }
        }

        private bool VerifyPasswordHash(string password, string storedHash)
        {
            var computedHash = HashPassword(password);
            return computedHash.Equals(storedHash);
        }
    }
}
