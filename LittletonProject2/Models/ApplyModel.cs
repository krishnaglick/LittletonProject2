﻿using System;
using System.Data.Entity;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace LittletonProject2.Models
{
    public class ApplyModel
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid id { get; set; }
        public string ApplicationData { get; set; }
    }

    public class ApplyModelContext : DbContext
    {
        public DbSet<ApplyModel> ApplyModels { get; set; }
    }
}