using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain.DTOs;
using MediatR;
using Persistence;

namespace Application.Suppliers.Queries
{
    public class GetSupplierById
    {  public class Query : IRequest<SupplierDTO>
        {
            public required int Id { get; set; }
        }

        public class Handler(AppDbContext context, IMapper mapper) : IRequestHandler<Query, SupplierDTO>
        {
            public async Task<SupplierDTO> Handle(Query request, CancellationToken cancellationToken)
            {
                var supplier = context.Suppliers.Where(c => c.Id == request.Id)
                        .ProjectTo<SupplierDTO>(mapper.ConfigurationProvider)
                        .FirstOrDefault();
                if (supplier == null) throw new Exception("Category not found.");
                return supplier;
            }
        }
    }
}