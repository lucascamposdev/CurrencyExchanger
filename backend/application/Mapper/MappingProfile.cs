using AutoMapper;
using backend.application.User.DTO;
using backend.domain;

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
            .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name));
    }
}
