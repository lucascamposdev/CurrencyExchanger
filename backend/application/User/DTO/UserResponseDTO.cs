using Microsoft.AspNetCore.Identity;

namespace backend.application.User.DTO;

public class UserResponseDTO
{
    public string Token { get; set; }
    public UserData UserData { get; set; }
}

public class UserData
{
    public string Email { get; set; }
    public string Name { get; set; }
    public string Currency {  get; set; }
    public decimal Balance { get; set; }
}

