using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Products.Queries
{
    public class GetProductList
    {
        public class Query : IRequest<List<ProductDTO>> { }

        public class Handler(AppDbContext context, IMapper mapper) : IRequestHandler<Query, List<ProductDTO>>
        {
            public async Task<List<ProductDTO>> Handle(Query request, CancellationToken cancellationToken)
            {
                var products = await context.Products
                .ProjectTo<ProductDTO>(mapper.ConfigurationProvider)
                .ToListAsync();

                return products;

            }
        }
    }
}