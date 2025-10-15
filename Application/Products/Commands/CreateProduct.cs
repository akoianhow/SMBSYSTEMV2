using Domain;
using MediatR;
using Persistence;

namespace Application.Products.Commands
{
    public class CreateProduct
    {
        public class Command : IRequest<int>
        {
            public required Product Product { get; set; }
        }

        public class Handler(AppDbContext context) : IRequestHandler<Command, int>
        {
            public async Task<int> Handle(Command request, CancellationToken cancellationToken)
            {
                context.Products.Add(request.Product);
                await context.SaveChangesAsync(cancellationToken);
                return request.Product.Id;
            }
        }

    }
}

