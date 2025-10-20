using System.Data.Common;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using Domain.DTOs;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Suppliers.Queries
{
    public class GetSuppliers
    {
        public class Query : IRequest<List<SupplierDTO>> { }

        public class Handler(AppDbContext context, IMapper mapper) : IRequestHandler<Query, List<SupplierDTO>>
        {
            public async Task<List<SupplierDTO>> Handle(Query request, CancellationToken cancellationToken)
            {
                var suppliers = await context.Suppliers
                .ProjectTo<SupplierDTO>(mapper.ConfigurationProvider)
                .ToListAsync();

                return suppliers;
            }
        }
    }

    public class GetSuppliersById
    {
        public class Query : IRequest<SupplierDTO>
        {
            public required int Id { get; set; }
        }
        public class Handler(AppDbContext context, IMapper mapper) : IRequestHandler<Query, SupplierDTO>
        {
            public async Task<SupplierDTO> Handle(Query request, CancellationToken cancellationToken)
            {
                var supplier = context.Suppliers.Where(s => s.Id == request.Id)
                .ProjectTo<SupplierDTO>(mapper.ConfigurationProvider)
                .FirstOrDefault();
                if (supplier == null) throw new Exception("Supplier not found.");
                return supplier;
            }
        }
    }

   
}