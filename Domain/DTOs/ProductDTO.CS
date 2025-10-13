public class ProductDTO
{
    public string Id { get; set; } = Guid.NewGuid().ToString();
    public string Name { get; set; } = "";
    public string Description { get; set; } = "";
    public bool IsActive { get; set; } = true;
    public bool IsConsigned { get; set; } = false;
    public decimal Cost { get; set; }
    public decimal SRP { get; set; }
    public int ItemsInStock { get; set; }
    public string CategoryId { get; set; } = "";
    public string? CategoryName { get; set; }
    public string SupplierId { get; set; } = "";
    public string? SupplierName { get; set; }

}