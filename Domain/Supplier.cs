using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain
{
    public class Supplier
    {
        public Int32 Id { get; set; }
        public string Name { get; set; } = "";
        public ICollection<Product> Products { get; set; } = [];
    }
}