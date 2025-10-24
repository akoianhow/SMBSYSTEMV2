using Application.Core;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Products.Commands
{
    public class CreateProduct
    {
        public class Command : IRequest<Result<int>>
        {
            public required ProductDTO Product { get; set; }
        }

        public class Handler(AppDbContext context, IMapper mapper) : IRequestHandler<Command, Result<int>>
        {
            public async Task<Result<int>> Handle(Command request, CancellationToken cancellationToken)
            {
                var product = mapper.Map<Product>(request.Product);
                context.Products.Add(product);
               
                var result = await context.SaveChangesAsync(cancellationToken) > 0;

                 if (!result) return Result<int>.Failure("Failed to create activity", 400);

                return Result<int>.Success(product.Id);

            }
        }

    }
}

