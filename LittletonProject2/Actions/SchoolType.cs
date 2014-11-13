using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace LittletonProject2.Actions
{
    static class SchoolType
    {
        public static string[] GetSchoolTypes()
        {
            return new String[] { "High School", "Under-Graduate","Graduate","Post-Graduate","Professional" };
        }
    }
}