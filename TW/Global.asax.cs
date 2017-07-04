using System.Web.Mvc;
using System.Web.Routing;

namespace TW
{
    public class MvcApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();
            RouteTable.Routes.MapRoute("Home", "{action}", new { controller = "Home", action = "News" });
            RouteConfig.RegisterRoutes(RouteTable.Routes);
        }
    }
}
