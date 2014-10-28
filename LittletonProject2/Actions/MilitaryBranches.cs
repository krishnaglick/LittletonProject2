using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace LittletonProject2.Actions
{
    static class MilitaryBranches
    {
        public static string[] GetMilitaryBranches()
        {
            return new String[] { "Army", "Marine Corps", "Navy", "Air Force", "Coast Guard" };
        }
    }
}