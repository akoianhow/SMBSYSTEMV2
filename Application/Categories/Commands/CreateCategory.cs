using Domain;
using MediatR;
using Persistence;

namespace Application.Categories.Commands
{
    public class CreateCategory
    {
        public class Command : IRequest<int>
        {
            public required Category Category { get; set; }
        }

        public class Handler(AppDbContext context) : IRequestHandler<Command, int>
        {
            public async Task<int> Handle(Command request, CancellationToken cancellationToken)
            {
                context.Categories.Add(request.Category);
                await context.SaveChangesAsync(cancellationToken);
                return request.Category.Id;
            }
        }
       
    }
}