﻿using System;
using System.Data.Entity;
using System.ComponentModel.DataAnnotations;

namespace LittletonProject2.Models
{
    public class ApplyModel
    {
        [Key]
        public Guid id { get; set; }
        public string ApplicationData { get; set; }
    }

    public class ApplyModelContext : DbContext
    {
        public DbSet<ApplyModel> ApplyModels { get; set; }
    }
}