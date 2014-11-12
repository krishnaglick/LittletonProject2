using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using LittletonProject2.Models;
using LittletonProject2.Actions;

namespace LittletonProject2.Actions
{
    public class ApplicationInteraction
    {
        public string SaveApplication(string Application)
        {
            var appmodel = new ApplyModel();
            string id = new Utilities().RandStr(16);

            appmodel.id = id;
            appmodel.ApplicationData = Application;

            ApplyModelContext amc = new ApplyModelContext();

            amc.ApplyModels.Add(appmodel);
            amc.SaveChanges();

            return id;
        }

        public string LoadApplication(string id)
        {
            return new ApplyModelContext().ApplyModels.Where(a => a.id == id).ToList()[0].ApplicationData;
        }
    }
}