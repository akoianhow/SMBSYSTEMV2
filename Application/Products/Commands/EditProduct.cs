using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Products.Commands
{
    public class EditProduct
    {
        public class Command : IRequest
        {
            public required Product Product { get; set; }
        }
        public class Handler(AppDbContext context, IMapper mapper) : IRequestHandler<Command>
        {
            public async Task Handle(Command request, CancellationToken cancellationToken)
            {
                var product = await context.Products.FindAsync([request.Product.Id], cancellationToken);
                if (product == null) throw new Exception("Cannot find product.");

                mapper.Map(request.Product, product);

                await context.SaveChangesAsync(cancellationToken);

            }
        }
    }
}