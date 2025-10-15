using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;
using Microsoft.EntityFrameworkCore.Query;
using Persistence;

namespace Application.Products.Commands
{
    public class DeleteProduct
    {
        public class Command : IRequest
        {
            public required int Id { get; set; }
        }
        public class Handler(AppDbContext context) : IRequestHandler<Command>
        {
            public async Task Handle(Command request, CancellationToken cancellationToken)
            {
                var product = await context.Products.FindAsync([request.Id], cancellationToken)
                ?? throw new Exception("Cannot find product.");

                context.Remove(product);
                await context.SaveChangesAsync(cancellationToken);

            }
        }
    }
}