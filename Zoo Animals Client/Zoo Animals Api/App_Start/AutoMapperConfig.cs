using AutoMapper;
using System;
using System.Collections.Generic;
using Zoo_Animals_Api.DTO;
using Zoo_Animals_DAL.Entitites;

namespace Zoo_Animals_Api.App_Start
{
    public static class AutoMapperConfig
    {
        public static void Configure()
        {
            Mapper.Initialize(cfg =>
            {
                cfg.AddProfile(new AnimalProfile());
            });
            Mapper.Configuration.CompileMappings();
        }
    }

    public class AnimalProfile : Profile
    {
        public AnimalProfile()
        {
            CreateMap<Animal, AnimalDTO>();
            CreateMap<AnimalDTO, Animal>()
                .ForMember(dest => dest.Modified, opt => opt.UseValue(DateTime.Now));
            CreateMap<Species, SpeciesDTO>().ReverseMap();
            CreateMap<List<Species>, List<SpeciesDTO>>().ReverseMap();
            CreateMap<List<Animal>, List<AnimalDTO>>().ReverseMap();
        }
    }
}