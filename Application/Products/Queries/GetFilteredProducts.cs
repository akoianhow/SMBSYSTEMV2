using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Persistence;

namespace Application.Products.Queries
{
    public class GetFilteredProducts
    {
        public class Query : IRequest<List<ProductDTO>>
        {
            public int Page { get; set; }
            public int Limit { get; set; }
            public string SortBy { get; set; } = "";
            public string Order { get; set; } = "";
            public string QueryString { get; set; } = "";
        }
        public class Handler(AppDbContext context, IMapper mapper) : IRequestHandler<Query, List<ProductDTO>>
        {
            public async Task<List<ProductDTO>> Handle(Query request, CancellationToken cancellationToken)
            {
                if (request.Limit <= 0) request.Limit = 10;
                if (request.Page < 0) request.Page = 0;

                var products = context.Products.AsNoTracking();
                if (!string.IsNullOrWhiteSpace(request.QueryString))
                {
                    var lower = request.QueryString.Trim().ToLower();
                    products = products.Where(p =>
                    EF.Functions.Like(p.Name.ToLower(), $"%{lower}%") ||
                    EF.Functions.Like(p.Description.ToLower(), $"%{lower}%"));
                }

                //Paging
                var skip = request.Page * request.Limit;
                var items = await products
                .Skip(skip).Take(request.Limit)
                .ProjectTo<ProductDTO>(mapper.ConfigurationProvider)
                .ToListAsync();
           
                return items;
            }
        }

    }
}