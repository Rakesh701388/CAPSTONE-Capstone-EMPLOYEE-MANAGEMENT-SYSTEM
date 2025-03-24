using EmployeeManagementSystem.Models;
using EmployeeManagementSystem.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace EmployeeManagementSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("register")]
        public async Task<ActionResult<AuthResponse>> Register(RegisterModel model)
        {
            var response = await _authService.Register(model);

            if (response == null)
                return BadRequest("Username is already taken.");

            return Ok(response);
        }

        [HttpPost("login")]
        public async Task<ActionResult<AuthResponse>> Login(LoginModel model)
        {
            var response = await _authService.Login(model);

            if (response == null)
                return Unauthorized("Invalid username or password.");

            return Ok(response);
        }
    }
}
