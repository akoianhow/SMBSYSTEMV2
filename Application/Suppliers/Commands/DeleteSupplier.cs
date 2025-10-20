using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Threading.Tasks;
using MediatR;
using Persistence;

namespace Application.Suppliers.Commands
{
    public class DeleteSupplier
    {
        public class Command : IRequest
        {
            public required int Id { get; set; }
        }

        public class Handler(AppDbContext context) : IRequestHandler<Command>
        {
            public async Task Handle(Command request, CancellationToken cancellationToken)
            {
                var supplier = await context.Suppliers.FindAsync([request.Id], cancellationToken);
                if (supplier == null) throw new Exception("Cannot find supplier");

                context.Remove(supplier);
                await context.SaveChangesAsync();
            }
        }
    }
}