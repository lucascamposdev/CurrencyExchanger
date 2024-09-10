using Microsoft.AspNetCore.Identity;

namespace backend.domain;

public class ApplicationUser : IdentityUser
{
    public string Name { get; set; }

    public string Currency { get; set; } = "USD";

    public decimal Balance { get; set; } = 100.00m;
}
