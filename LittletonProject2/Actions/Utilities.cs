using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace LittletonProject2.Actions
{
    public class Utilities
    {
        private Random _random = new Random();

        public string RandStr(int size)
        {
            string randstr = String.Empty;

            for (int i = 1; i < size; i++)
                randstr += GetLetter();

            return randstr;
        }

        public char GetLetter()
        {
            return (char)('a' + _random.Next(0, 26));
        }
    }
}