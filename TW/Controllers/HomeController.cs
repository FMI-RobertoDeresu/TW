using System.Web.Mvc;

namespace TW.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult News()
        {
            return View("News");
        }

        public ActionResult Team()
        {
            return View("Team");
        }

        public ActionResult Fixtures()
        {
            return View("Fixtures");
        }

        public ActionResult Stadium()
        {
            return View("Stadium");
        }

        public ActionResult _4Fun()
        {
            return View("_4Fun");
        }

        public ActionResult Legends()
        {
            return View("Legends");
        }

        public ActionResult TeamHistory()
        {
            return View("TeamHistory");
        }

        public ActionResult TeamGallery()
        {
            return View("TeamGallery");
        }

        public ActionResult StadiumGallery()
        {
            return View("StadiumGallery");
        }

        public ActionResult HistoryGallery()
        {
            return View("HistoryGallery");
        }
    }
}