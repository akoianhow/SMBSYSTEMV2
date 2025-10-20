using Application.Core;
using MediatR;
using Persistence;

namespace Application.Products.Commands
{
    public class DeleteProduct
    {
        public class Command : IRequest<Result<Unit>>
        {
            public required int Id { get; set; }
        }
        public class Handler(AppDbContext context) : IRequestHandler<Command, Result<Unit>>
        {
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var product = await context.Products.FindAsync([request.Id], cancellationToken);


                if (product == null) return Result<Unit>.Failure("Product not found", 404);

                context.Remove(product);
                var result = await context.SaveChangesAsync(cancellationToken) > 0;

                if (!result) return Result<Unit>.Failure("Failed to delete activity", 400);

                return Result<Unit>.Success(Unit.Value);

            }
        }
    }
}