using System;
using System.Configuration;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace TW
{
    public class MvcApplication : HttpApplication
    {
        public override void Init()
        {
            BeginRequest += OnBeginRequest;
        }

        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();
            RouteTable.Routes.MapRoute("Home", "{action}", new { controller = "Home", action = "News" });
            RouteConfig.RegisterRoutes(RouteTable.Routes);
        }

        protected void OnBeginRequest(object sender, EventArgs e)
        {
            var httpApplication = (HttpApplication) sender;
            var url = httpApplication.Context.Request.Url;
            var requireHttps = bool.Parse(ConfigurationManager.AppSettings["requireHttps"]);

            if (url.Scheme == "http" && requireHttps)
            {
                httpApplication.Context.Response.RedirectPermanent(url.ToString().Replace("http", "https"));
                httpApplication.Context.ApplicationInstance.CompleteRequest();
            }
        }
    }
}