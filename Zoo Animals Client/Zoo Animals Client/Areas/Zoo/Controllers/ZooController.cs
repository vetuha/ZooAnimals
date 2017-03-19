using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Zoo_Animals_Client.Areas.Zoo.Controllers
{
    public class ZooController : Controller
    {
        // GET: Zoo/Zoo
        public ActionResult Index()
        {
            return View();
        }
    }
}