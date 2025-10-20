using MediatR;
using Persistence;

namespace Application.Categories.Commands
{
    public class DeleteCategory
    {
        public class Command : IRequest
        {
            public required int Id { get; set; }
        }
        public class Handler(AppDbContext context) : IRequestHandler<Command>
        {
            public async Task Handle(Command request, CancellationToken cancellationToken)
            {
                 var category = await context.Categories.FindAsync(
                                        [request.Id], cancellationToken);

                if (category == null) throw new Exception("Cannot find category");
                context.Remove(category);
                await context.SaveChangesAsync(cancellationToken);
            }
        }
    }
}