using System.Web.Mvc;

namespace Zoo_Animals_Client.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public PartialViewResult Urls()
        {
            return PartialView("_Urls");
        }
    }
}