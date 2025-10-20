using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Products.Queries
{
    public class GetProductById
    {
        public class Query : IRequest<Result<ProductDTO>>
        {
            public required int Id { get; set; }
        }

        public class Handler(AppDbContext context, IMapper mapper) : IRequestHandler<Query, Result<ProductDTO>>
        {
            public async Task<Result<ProductDTO>> Handle(Query request, CancellationToken cancellationToken)
            {
                var product = await context.Products
                .Where(p => p.Id == request.Id)
                .ProjectTo<ProductDTO>(mapper.ConfigurationProvider)
                .FirstOrDefaultAsync();

                if (product == null) return Result<ProductDTO>.Failure("Product not found.", 404);

                return Result<ProductDTO>.Success(product);
            }
        }
    }
}