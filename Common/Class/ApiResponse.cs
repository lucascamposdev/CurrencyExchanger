namespace SocketQuotes.domain;

public class ApiResponse
{
    public string Base { get; set; }
    public Dictionary<string, decimal> Rates { get; set; }
}
