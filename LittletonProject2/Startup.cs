using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(LittletonProject2.Startup))]
namespace LittletonProject2
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
