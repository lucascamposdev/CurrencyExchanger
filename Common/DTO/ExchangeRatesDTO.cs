namespace SocketQuotes.application.DTO;

public class ExchangeRatesDTO
{
    public string BaseCurrency { get; set; }
    public List<RateDTO> Rates { get; set; }

    public string LastUpdate { get; set; }
}

public class RateDTO
{
    public string Currency { get; set; }
    public decimal Rate { get; set; }
}
