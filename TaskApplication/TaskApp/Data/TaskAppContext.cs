using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using TaskApp.Models;

namespace TaskApp.Data
{
    public class TaskAppContext : DbContext
    {
        public TaskAppContext (DbContextOptions<TaskAppContext> options)
            : base(options)
        {
        }

        public DbSet<TaskApp.Models.TaskModel> TaskModel { get; set; }
    }
}
