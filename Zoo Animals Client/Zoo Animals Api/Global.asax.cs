using AutoMapper;
using System;
using System.Collections.Generic;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;
using Zoo_Animals_Api.DTO;
using Zoo_Animals_DAL.Entitites;

namespace Zoo_Animals_Api
{
    public class WebApiApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();
            GlobalConfiguration.Configure(WebApiConfig.Register);
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);
            UnityConfig.RegisterComponents();

            ConfigureUserMappings();
        }

        private static void ConfigureUserMappings()
        {
            Mapper.Initialize(cfg =>
            {
                cfg.CreateMap<Animal, AnimalDTO>();
                cfg.CreateMap<AnimalDTO, Animal>()
                   .ForMember(dest => dest.Modified, opt => opt.UseValue(DateTime.Now));
                cfg.CreateMap<Species, SpeciesDTO>();
                cfg.CreateMap<SpeciesDTO, Species>();
                cfg.CreateMap<List<Species>, List<SpeciesDTO>>();
                cfg.CreateMap<List<AnimalDTO>, List<Animal>>();
                cfg.CreateMap<List<Animal>, List<AnimalDTO>>();
            });
        }
    }
}
