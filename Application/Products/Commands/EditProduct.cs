using Application.Core;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Products.Commands
{
    public class EditProduct
    {
        public class Command : IRequest<Result<Unit>>
        {
            public required ProductDTO Product { get; set; }
        }
        public class Handler(AppDbContext context, IMapper mapper) : IRequestHandler<Command, Result<Unit>>
        {
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var product = await context.Products.FindAsync([request.Product.Id], cancellationToken);
                if (product == null) throw new Exception("Cannot find product.");
                
                mapper.Map(request.Product, product);

                var result = await context.SaveChangesAsync(cancellationToken) > 0;

                 if (!result) return Result<Unit>.Failure("Failed to edit activity", 400);

                return Result<Unit>.Success(Unit.Value);

            }
        }
    }
}