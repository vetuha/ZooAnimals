using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(Zoo_Animals_Client.Startup))]
namespace Zoo_Animals_Client
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
