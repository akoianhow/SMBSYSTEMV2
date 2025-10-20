using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Products.Commands;
using FluentValidation;

namespace Application.Products.Validators
{
    public class CreateProductValidator: AbstractValidator<CreateProduct.Command>
    {
        public CreateProductValidator()
        {
            RuleFor(x => x.Product.Name).NotEmpty().WithMessage("Name is required.");
            RuleFor(x => x.Product.Description).NotEmpty().WithMessage("Description is required.");
        }
    }
}