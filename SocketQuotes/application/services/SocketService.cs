using AutoMapper;
using Newtonsoft.Json.Linq;
using SocketQuotes.application.DTO;
using SocketQuotes.domain;
using System.Net.Http;
using System.Threading.Tasks;

namespace SocketQuotes.application.services;

    public class SocketService
    {
        private readonly HttpClient _httpClient;
        private readonly string _apiBaseUrl;
        private readonly IMapper mapper;

    public SocketService(HttpClient httpClient, IConfiguration configuration, IMapper mapper)
    {
        _httpClient = httpClient;
        _apiBaseUrl = configuration["ApiSettings:BaseUrl"]!;
        this.mapper = mapper;
    }

    public async Task<ExchangeRatesDTO> GetQuotesAsync(string baseCurrency)
    {
        var url = $"{_apiBaseUrl}{baseCurrency}";
        var response = await _httpClient.GetStringAsync(url);
        var apiResponse = JObject.Parse(response).ToObject<ApiResponse>();

        var exchangeRatesDTO = mapper.Map<ExchangeRatesDTO>(apiResponse);
        exchangeRatesDTO.LastUpdate = DateTime.Now.ToString("HH:mm:ss - dd/MM/yyyy");

        return exchangeRatesDTO!;
    }
}
