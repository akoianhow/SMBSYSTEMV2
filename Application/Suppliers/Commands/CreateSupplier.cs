using Domain;
using MediatR;
using Persistence;

namespace Application.Suppliers.Commands
{
  public class CreateSupplier
    {
        public class Command : IRequest<int>
        {
            public required Supplier Supplier { get; set; }
        }
        public class Handler(AppDbContext context) : IRequestHandler<Command, int>
        {
            public async Task<int> Handle(Command request, CancellationToken cancellationToken)
            {
                context.Suppliers.Add(request.Supplier);
                await context.SaveChangesAsync(cancellationToken);
                return request.Supplier.Id;
            }
        }
    }
}