using AutoMapper;
using backend.application.User.DTO;
using backend.domain;
using SocketQuotes.application.DTO;
using SocketQuotes.domain;

namespace backend.application.Mapper;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        // Mapeamento do ApplicationUser para UserResponseDTO
        CreateMap<ApplicationUser, UserResponseDTO>()
            .ForMember(dest => dest.UserData, opt => opt.MapFrom(src => src))
            .ForMember(dest => dest.Token, opt => opt.Ignore());

        CreateMap<ApplicationUser, UserData>()
            .ForMember(dest => dest.Email, opt => opt.MapFrom(src => src.Email))
            .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
            .ForMember(dest => dest.Currency, opt => opt.MapFrom(src => src.Currency))
            .ForMember(dest => dest.Balance, opt => opt.MapFrom(src => src.Balance));

        CreateMap<ApiResponse, ExchangeRatesDTO>()
            .ForMember(dest => dest.BaseCurrency, opt => opt.MapFrom(src => src.Base))
            .ForMember(dest => dest.Rates, opt => opt.MapFrom(src => MapRates(src.Rates)));
    }
    private List<RateDTO> MapRates(Dictionary<string, decimal> rates)
    {
        // Lista de moedas que você deseja incluir
        var selectedCurrencies = new[] { "USD", "BRL", "EUR", "JPY", "GBP", "AUD", "CAD", "CHF", "CNY", "HKD", "NZD" };

        return rates
            .Where(rate => selectedCurrencies.Contains(rate.Key))
            .Select(rate => new RateDTO
            {
                Currency = rate.Key,
                Rate = rate.Value
            })
            .ToList();
    }

}
