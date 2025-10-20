using AutoMapper;
using Domain;
using Domain.DTOs;

namespace Application.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Product, Product>();
            CreateMap<ProductDTO, Product>();
            CreateMap<Category, Category>();
            CreateMap<Category, CategoryDTO>();
            CreateMap<CategoryDTO, Category>();
            CreateMap<Supplier, SupplierDTO>();
            CreateMap<Supplier, Supplier>();

            CreateMap<Product, ProductDTO>()
            .ForMember(dest => dest.CategoryName, opt => opt.MapFrom(src => src.Category.Name))
            .ForMember(dest => dest.SupplierName, opt => opt.MapFrom(src => src.Supplier.Name));
        }
    }
}