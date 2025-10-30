using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Threading.Tasks;

namespace Domain
{
    public class Product
    {
        public Int32 Id { get; set; }
        public string Name { get; set; } = "";
        public string Description { get; set; } = "";
        public Int32 CategoryId { get; set; }
        public Category? Category { get; set; } = null;
        public Int32 SupplierId { get; set; }
        public Supplier? Supplier { get; set; }
        public bool IsActive { get; set; } = true;
        public bool IsConsigned { get; set; } = false;
        public decimal Cost { get; set; }
        public decimal SRP { get; set; }
        public int ItemsInStock { get; set; }

    }
}