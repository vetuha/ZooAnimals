using System.Web.Mvc;

namespace Zoo_Animals_Api.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            ViewBag.Title = "About";

            return View();
        }
    }
}
