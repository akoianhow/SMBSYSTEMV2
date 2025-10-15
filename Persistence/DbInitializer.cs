using System;
using System.ComponentModel;
using Domain;

namespace Persistence;

public class DbInitializer
{
    public static async Task SeedData(AppDbContext context)
    {
        if (context.Products.Any()) return;

        var products = new List<Product>
        {
            new() { Id = 1,
            Name = "TRINX MAJES 001",
            CategoryId = 1,
            SupplierId = 1,
            Cost = 5000,
            SRP = 10000},
            new() { Id = 2,
            Name = "SPDER BERM",
            CategoryId = 2,
            SupplierId =4,
            Cost = 5000,
            SRP = 10000},
             new() { Id = 3,
            Name = "SPDER CADENCE",
            CategoryId = 2,
            SupplierId = 4,
            Cost = 5000,
            SRP = 10000},
             new() { Id = 4,
            Name = "SPDER VORTEX",
            CategoryId = 2,
            SupplierId = 4,
            Cost = 5000,
            SRP = 10000}
        };

        context.Products.AddRange(products);

        var categories = new List<Category>
        {
        new() { Id = 1, Name = "BIKE"},
        new() { Id = 2, Name="HELMET"}
        };

        context.Categories.AddRange(categories);

        var suppliers = new List<Supplier>
        {
            new() { Id = 1, Name = "SMB"},
            new() { Id = 2, Name = "JP"},
            new() { Id = 3, Name = "TRINX"},
            new() { Id = 4, Name = "SPYDER"},
        };
        context.Suppliers.AddRange(suppliers);

        await context.SaveChangesAsync();
    }
}
