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
            new() { Id = "C3C82A70-5739-47AF-9C0B-0F6923DD9886",
            Name = "TRINX MAJES 001",
            CategoryId = "69AFFC85-AEE2-43A5-9652-11AEBF0CBE96",
            SupplierId = "57C515F6-41F7-4C5A-BAE7-CF6F9C1F0366",
            Cost = 5000,
            SRP = 10000},
            new() { Id = "1BD02885-26EF-418E-B7E4-46A9DC82A26B",
            Name = "SPDER BERM",
            CategoryId = "80821F57-8160-43AD-AC9B-14BD13DD9105",
            SupplierId = "CA456B90-66C7-4FB6-8946-B85277EE8BF5",
            Cost = 5000,
            SRP = 10000},
             new() { Id = "2DEA7B6D-45BD-482E-8BA5-0159DECD2D37",
            Name = "SPDER CADENCE",
            CategoryId = "80821F57-8160-43AD-AC9B-14BD13DD9105",
            SupplierId = "CA456B90-66C7-4FB6-8946-B85277EE8BF5",
            Cost = 5000,
            SRP = 10000},
             new() { Id = "2CB2FF1D-019C-42C3-BCAF-A0DA179A1EF2",
            Name = "SPDER VORTEX",
            CategoryId = "80821F57-8160-43AD-AC9B-14BD13DD9105",
            SupplierId = "CA456B90-66C7-4FB6-8946-B85277EE8BF5",
            Cost = 5000,
            SRP = 10000}
        };

        context.Products.AddRange(products);

        var categories = new List<Category>
        {
        new() { Id = "69AFFC85-AEE2-43A5-9652-11AEBF0CBE96", Name = "BIKE"},
        new() { Id = "80821F57-8160-43AD-AC9B-14BD13DD9105", Name="HELMET"}
        };

        context.Categories.AddRange(categories);

        var suppliers = new List<Supplier>
        {
            new() { Id = "6D683EB5-AD29-4E28-82E0-09977225BD13", Name = "JP"},
            new() { Id = "57C515F6-41F7-4C5A-BAE7-CF6F9C1F0366", Name = "TRINX"},
            new() { Id = "CA456B90-66C7-4FB6-8946-B85277EE8BF5", Name = "SPYDER"},
        };
        context.Suppliers.AddRange(suppliers);

        await context.SaveChangesAsync();
    }
}
