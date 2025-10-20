using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Products.Commands
{
    public class CreateProduct
    {
        public class Command : IRequest<int>
        {
            public required ProductDTO Product { get; set; }
        }

        public class Handler(AppDbContext context, IMapper mapper) : IRequestHandler<Command, int>
        {
            public async Task<int> Handle(Command request, CancellationToken cancellationToken)
            {
                context.Products.Add( mapper.Map<Product>(request.Product));
                await context.SaveChangesAsync(cancellationToken);
                return request.Product.Id;
            }
        }

    }
}

