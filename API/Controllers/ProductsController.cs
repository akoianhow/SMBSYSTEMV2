using Application.Products.Commands;
using Application.Products.Queries;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ProductsController() : BaseApiController
    {
        [HttpGet]
        public async Task<ActionResult<List<ProductDTO>>> GetProducts()
        {
            return await Mediator.Send(new GetProductList.Query());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ProductDTO>> GetProductById(Int32 id)
        {
            return await Mediator.Send(new GetProductById.Query { Id = id });
        }

        [HttpGet("category/{id}")]
        public async Task<ActionResult<List<ProductDTO>>> GetProductsByCategoryId(Int32 id)
        {
            return await Mediator.Send(new GetProductByCategoryId.Query { CategoryId = id });
        }

        [HttpPost]
        public async Task<ActionResult<int>> CreateProduct(Product product)
        {
            return await Mediator.Send(new CreateProduct.Command { Product = product });
        }
        [HttpPut]
        public async Task<ActionResult> EditProduct(Product product)
        {
            await Mediator.Send(new EditProduct.Command { Product = product });
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteActivity(int id)
        {
            await Mediator.Send(new DeleteProduct.Command { Id = id });
            return Ok();
        }
    }
}