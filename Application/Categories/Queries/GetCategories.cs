using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain.DTOs;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Categories.Queries
{
    public class GetCategories
    {
        public class Query : IRequest<List<CategoryDTO>> { }

        public class Handler(AppDbContext context, IMapper mapper) : IRequestHandler<Query, List<CategoryDTO>>
        {
            public async Task<List<CategoryDTO>> Handle(Query request, CancellationToken cancellationToken)
            {
                var categories = await context.Categories
                .ProjectTo<CategoryDTO>(mapper.ConfigurationProvider)
                .ToListAsync();

                return categories;
            }
        }
    }
}