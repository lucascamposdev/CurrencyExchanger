using Microsoft.AspNetCore.Identity;

namespace backend.domain;

public class ApplicationUser : IdentityUser
{
    public string Name { get; set; }
}
