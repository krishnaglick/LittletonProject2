using LittletonProject2.Actions;
using System.Web;
using System.Web.Mvc;

namespace LittletonProject2.Controllers
{
    public class ApplyController : Controller
    {
        [HttpGet]
        public ActionResult Apply()
        {
            return View();
        }

        [HttpPost]
        public ActionResult GetStates()
        {
            return Json(StateArray.Abbreviations(), JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult getMilitaryBranches()
        {
            return Json(MilitaryBranches.GetMilitaryBranches(), JsonRequestBehavior.AllowGet);
        }
    }
}