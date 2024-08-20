using Microsoft.AspNetCore.Identity;

namespace backend.DTO;

public class UserResponseDTO
{
    public string Token { get; set; }
    public UserData UserData { get; set; }
}

public class UserData { 
   public string Email { get; set; }
   public string Name { get; set; }
}

