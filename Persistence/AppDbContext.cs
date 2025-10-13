using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class AppDbContext(DbContextOptions options) : DbContext(options)
    {
        public required DbSet<Product> Products { get; set; }
        public required DbSet<Category> Categories { get; set; }
        public required DbSet<Supplier> Suppliers { get; set; }
    }
}