using AutoMapper;
using backend.Entity;

namespace backend.DTO;

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
            .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name));
    }
}
