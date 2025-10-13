using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Threading.Tasks;

namespace Domain
{
    public class Product
    {
        public string Id { get; set; } = Guid.NewGuid().ToString();
        public string Name { get; set; } = "";
        public string Description { get; set; } = "";
        public string CategoryId { get; set; } = "";
        public Category? Category { get; set; } = null;

        public string SupplierId { get; set; } = "";
        public Supplier? Supplier { get; set; }
        public bool IsActive { get; set; } = true;
        public bool IsConsigned { get; set; } = false;
        public decimal Cost { get; set; }
        public decimal SRP { get; set; }
        public int ItemsInStock { get; set; }

    }
}