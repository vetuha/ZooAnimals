using Microsoft.Practices.Unity;
using System.Web.Http;
using Unity.WebApi;
using Zoo_Animals_Api.Inrefaces;
using Zoo_Animals_Api.Services;
using Zoo_Animals_DAL.Interfaces;
using Zoo_Animals_DAL.Repositories;

namespace Zoo_Animals_Api
{
    public static class UnityConfig
    {
        public static void RegisterComponents()
        {
			var container = new UnityContainer();
            
            container
                .RegisterType<IZooService, ZooService>()
                .RegisterType<IUnitOfWork, EFUnitOfWork>();

            GlobalConfiguration.Configuration.DependencyResolver = new UnityDependencyResolver(container);
        }
    }
}