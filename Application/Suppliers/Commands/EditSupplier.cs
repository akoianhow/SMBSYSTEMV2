using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Suppliers.Commands
{
    public class EditSupplier
    {
        public class Command : IRequest
        {
            public required Supplier Supplier { get; set; }
        }
        public class Handler(AppDbContext context, IMapper mapper) : IRequestHandler<Command>
        {
            public async Task Handle(Command request, CancellationToken cancellationToken)
            {
                var supplier = await context.Suppliers.FindAsync([request.Supplier.Id], cancellationToken);
                if (supplier == null) throw new Exception("Cannot find supplier");

                mapper.Map(request.Supplier, supplier);
                await context.SaveChangesAsync();
            }
        }
    }
}