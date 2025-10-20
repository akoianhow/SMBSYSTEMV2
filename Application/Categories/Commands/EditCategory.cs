using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using Domain.DTOs;
using MediatR;
using Persistence;

namespace Application.Categories.Commands
{
    public class EditCategory
    {
        public class Command : IRequest
        {
            public required Category Category { get; set; }
        }
        public class Handler(AppDbContext context, IMapper mapper) : IRequestHandler<Command>
        {
            public async Task Handle(Command request, CancellationToken cancellationToken)
            {
                var category = await context.Categories.FindAsync(
                                        [request.Category.Id], cancellationToken);
               // throw new Exception(category?.Name);
                if (category == null) throw new Exception("Cannot find category");

                mapper.Map(request.Category, category);
                await context.SaveChangesAsync(cancellationToken);
            }
        }
    }
}