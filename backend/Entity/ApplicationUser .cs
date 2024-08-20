using Microsoft.AspNetCore.Identity;

namespace backend.Entity;

public class ApplicationUser : IdentityUser
{
    public string Name { get; set; }
}
