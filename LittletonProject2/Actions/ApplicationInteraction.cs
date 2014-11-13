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
            ApplyModelContext amc = new ApplyModelContext();
            var appmodel = new ApplyModel();
            
            appmodel.ApplicationData = Application;

            amc.ApplyModels.Add(appmodel);
            amc.SaveChanges();

            return appmodel.id;
        }

        public String LoadApplication(Guid id)
        {
            return new ApplyModelContext().ApplyModels.Find(id).ApplicationData;
        }

        public void DeleteApplication(Guid id)
        {
            new ApplyModelContext().ApplyModels.Remove(new ApplyModelContext().ApplyModels.Find(id));
        }

        public void DeleteApplications()
        {
            new ApplyModelContext().ApplyModels.RemoveRange(new ApplyModelContext().ApplyModels.ToList());
        }
    }
}