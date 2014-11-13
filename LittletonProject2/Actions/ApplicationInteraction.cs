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
        public Guid SaveApplication(string Application)
        {
            var appmodel = new ApplyModel();
            
            appmodel.ApplicationData = Application;

            ApplyModelContext amc = new ApplyModelContext();

            amc.ApplyModels.Add(appmodel);
            amc.SaveChanges();

            return appmodel.id;
        }

        public String LoadApplication(Guid id)
        {
            return new ApplyModelContext().ApplyModels.Where(a => a.id == id).ToList()[0].ApplicationData;
        }
    }
}