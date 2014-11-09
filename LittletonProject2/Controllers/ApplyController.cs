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

        [HttpGet]
        public ActionResult GetStates()
        {
            return Json(StateArray.Abbreviations(), JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public ActionResult GetMilitaryBranches()
        {
            return Json(MilitaryBranches.GetMilitaryBranches(), JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public ActionResult GetSchoolTypes()
        {
            return Json(SchoolType.GetSchoolTypes(), JsonRequestBehavior.AllowGet);
        } 
    }
}