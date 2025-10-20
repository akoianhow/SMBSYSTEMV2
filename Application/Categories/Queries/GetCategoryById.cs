using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain.DTOs;
using MediatR;
using Persistence;

namespace Application.Categories.Queries
{
    public class GetCategoryById
    {
        public class Query : IRequest<CategoryDTO>
        {
            public required int Id { get; set; }
        }

        public class Handler(AppDbContext context, IMapper mapper) : IRequestHandler<Query, CategoryDTO>
        {
            public async Task<CategoryDTO> Handle(Query request, CancellationToken cancellationToken)
            {
                var category = context.Categories.Where(c => c.Id == request.Id)
                        .ProjectTo<CategoryDTO>(mapper.ConfigurationProvider)
                        .FirstOrDefault();
                if (category == null) throw new Exception("Category not found.");
                return category;
            }
        }
    }
}