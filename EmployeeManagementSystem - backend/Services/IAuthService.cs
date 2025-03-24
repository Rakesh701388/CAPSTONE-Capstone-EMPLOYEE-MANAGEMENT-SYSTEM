using EmployeeManagementSystem.Models;

namespace EmployeeManagementSystem.Services
{
    public interface IAuthService
    {
        Task<AuthResponse> Login(LoginModel model);
        Task<AuthResponse> Register(RegisterModel model);
        string GenerateJwtToken(User user);
    }
}
