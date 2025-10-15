public class ProductDTO
{
    public Int32 Id { get; set; }
    public string Name { get; set; } = "";
    public string Description { get; set; } = "";
    public bool IsActive { get; set; } = true;
    public bool IsConsigned { get; set; } = false;
    public decimal Cost { get; set; }
    public decimal SRP { get; set; }
    public int ItemsInStock { get; set; }
    public Int32 CategoryId { get; set; }
    public string? CategoryName { get; set; }
    public Int32 SupplierId { get; set; }
    public string? SupplierName { get; set; }

}