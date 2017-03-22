using System.Web.Mvc;

namespace Zoo_Animals_Client.Areas.Zoo
{
    public class ZooAreaRegistration : AreaRegistration 
    {
        public override string AreaName 
        {
            get 
            {
                return "Zoo";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context) 
        {
            context.MapRoute(
                "Zoo_default",
                "{controller}/{action}/{id}",
                new {area = "Zoo", action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}