using backend.DTO;
using backend.Entity;
using backend.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[ApiController]
[Route("[controller]")]
public class AuthController : ControllerBase
{
    private readonly AuthService _authService;

    public AuthController(AuthService authService)
    {
        _authService = authService;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] UserRegisterDTO dto)
    {
        try
        {
            var result = await _authService.Register(dto);
            return Ok(result);
        }
        catch (ApplicationException ex)
        {
            return BadRequest(new { Message = ex.Message });
        }
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] UserLoginDTO dto)
    {
        try
        {
            var result = await _authService.Login(dto);
            return Ok(result);
        }
        catch (ApplicationException ex)
        {
            return BadRequest(new { Message = ex.Message });
        }
    }

    [HttpPost("validate")]
    public async Task<IActionResult> ValidateToken([FromBody] string token)
    {
        try
        {
            var result = await _authService.ValidateToken(token);
            return Ok(result);
        }
        catch (ApplicationException ex)
        {
            return BadRequest(new { Message = ex.Message });
        }
    }
}


