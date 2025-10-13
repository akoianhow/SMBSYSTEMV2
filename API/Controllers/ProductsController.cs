using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    public class ProductsController(AppDbContext context) : BaseApiController
    {
        [HttpGet]
        public async Task<ActionResult<List<ProductDTO>>> GetProducts()
        {
            //TODO: REFACTOR USING AUTOMAPPER.
            var products = await context.Products
                .Include(p => p.Category).Include(p => p.Supplier)
                .Select(p => new ProductDTO
                {
                    Id = p.Id,
                    Name = p.Name,
                    Description = p.Description,
                    IsActive = p.IsActive,
                    IsConsigned = p.IsConsigned,
                    Cost = p.Cost,
                    SRP = p.SRP,
                    ItemsInStock = p.ItemsInStock,
                    CategoryId = p.CategoryId,
                    CategoryName = p.Category != null ? p.Category.Name : null,
                    SupplierId = p.SupplierId,
                    SupplierName = p.Supplier != null ? p.Supplier.Name : null
                })
                .ToListAsync();



            return products;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ProductDTO>> GetProductById(string id)
        {
            //TODO: REFACTOR USING AUTOMAPPER.
            var product = await context.Products
                .Include(p => p.Category).Include(p => p.Supplier)
                .Select(p => new ProductDTO
                {
                    Id = p.Id,
                    Name = p.Name,
                    Description = p.Description,
                    IsActive = p.IsActive,
                    IsConsigned = p.IsConsigned,
                    Cost = p.Cost,
                    SRP = p.SRP,
                    ItemsInStock = p.ItemsInStock,
                    CategoryId = p.CategoryId,
                    CategoryName = p.Category != null ? p.Category.Name : null,
                    SupplierId = p.SupplierId,
                    SupplierName = p.Supplier != null ? p.Supplier.Name : null
                }).FirstOrDefaultAsync(p => p.Id == id);

            if (product == null)
            {
                return NotFound();
            }
            return product;
        }
    }
}