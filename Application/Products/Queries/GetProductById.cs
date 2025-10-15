using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Products.Queries
{
    public class GetProductById
    {
        public class Query : IRequest<ProductDTO>
        {
            public required int Id { get; set; }
        }

        public class Handler(AppDbContext context, IMapper mapper) : IRequestHandler<Query, ProductDTO>
        {
            public async Task<ProductDTO> Handle(Query request, CancellationToken cancellationToken)
            {
                var product = context.Products
                .Where(p => p.Id == request.Id)
                .ProjectTo<ProductDTO>(mapper.ConfigurationProvider)
                .FirstOrDefault();

                if (product == null) throw new Exception("Product not found.");

                return product;
            }
        }
    }
}