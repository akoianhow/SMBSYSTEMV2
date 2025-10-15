using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Products.Queries
{
    public class GetProductByCategoryId
    {
        public class Query : IRequest<List<ProductDTO>>
        {
            public int CategoryId { get; set; }
        }

        public class Handler(AppDbContext context, IMapper mapper) : IRequestHandler<Query, List<ProductDTO>>
        {
            public async Task<List<ProductDTO>> Handle(Query request, CancellationToken cancellationToken)
            {
                var products = await context.Products.Where(p => p.CategoryId == request.CategoryId)
                .ProjectTo<ProductDTO>(mapper.ConfigurationProvider)
                .ToListAsync();
                return products;
            }
        }
    }
}