using AutoMapper;
using backend.DTO;
using backend.Entity;
using Microsoft.AspNetCore.Identity;
using System.Security.Claims;

namespace backend.Services;

public class AuthService
{
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly SignInManager<ApplicationUser> _signInManager;
    private readonly IMapper _mapper;
    private readonly TokenService _tokenService;

    public AuthService(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager, IMapper mapper, TokenService tokenService)
    {
        _userManager = userManager;
        _signInManager = signInManager;
        _mapper = mapper;
        _tokenService = tokenService;
    }

    public async Task<UserResponseDTO> Register(UserRegisterDTO dto)
    {
        var user = new ApplicationUser
        {
            UserName = dto.Email,
            Email = dto.Email,
            Name = dto.Name
        };

        var result = await _userManager.CreateAsync(user, dto.Password);

        if (result.Succeeded)
        {
            var userResponse = _mapper.Map<UserResponseDTO>(user);
            userResponse.Token = _tokenService.GenerateJwtToken(user);
            return userResponse;
        }

        var errors = result.Errors.Select(e => e.Description).ToList();
        throw new ApplicationException($"{string.Join(", ", errors)}");
    }

    public async Task<UserResponseDTO> Login(UserLoginDTO dto)
    {
        var result = await _signInManager.PasswordSignInAsync(dto.Email, dto.Password, false, lockoutOnFailure: false);

        if (result.Succeeded)
        {
            var user = await _userManager.FindByEmailAsync(dto.Email) ?? throw new ApplicationException("User not found.");

            var userResponse = _mapper.Map<UserResponseDTO>(user);
            userResponse.Token = _tokenService.GenerateJwtToken(user);

            return userResponse;
        }

        throw new ApplicationException("Wrong credentials.");
    }

    public async Task<UserResponseDTO> ValidateToken(string token)
    {
        var principal = _tokenService.GetPrincipalFromToken(token);
        if (principal == null)
        {
            throw new ApplicationException("Invalid token.");
        }

        var email = principal.FindFirst(ClaimTypes.Email)?.Value;
        if (email == null)
        {
            throw new ApplicationException("Token does not contain email.");
        }

        var user = await _userManager.FindByEmailAsync(email);
        if (user == null)
        {
            throw new ApplicationException("User not found.");
        }

        var userResponse = _mapper.Map<UserResponseDTO>(user);
        userResponse.Token = token;

        return userResponse;
    }
}
