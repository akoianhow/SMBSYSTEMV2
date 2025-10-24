using Application.Core;
using Application.Products.Commands;
using Application.Products.Queries;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ProductsController() : BaseApiController
    {
        [AllowAnonymous]
        [HttpGet]
        public async Task<ActionResult<List<ProductDTO>>> GetProducts()
        {
            return await Mediator.Send(new GetProductList.Query());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ProductDTO>> GetProductById(Int32 id)
        {
            var result = await Mediator.Send(new GetProductById.Query { Id = id });
            return HandleResult(result);
        }

        [HttpGet("category/{id}")]
        public async Task<ActionResult<List<ProductDTO>>> GetProductsByCategoryId(Int32 id)
        {
            return await Mediator.Send(new GetProductByCategoryId.Query { CategoryId = id });
        }

        [HttpPost]
        public async Task<ActionResult<int>> CreateProduct(ProductDTO product)
        {
            return HandleResult( await Mediator.Send(new CreateProduct.Command { Product = product }));
        }
        [HttpPut]
        public async Task<ActionResult> EditProduct(ProductDTO product)
        {
            return HandleResult(await Mediator.Send(new EditProduct.Command { Product = product }));
  
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteActivity(int id)
        {
            return HandleResult( await Mediator.Send(new DeleteProduct.Command { Id = id }));
    
        }


        [HttpGet("products")]
        public async Task<ActionResult> GetFilteredProducts(
        [FromQuery] int page = 0,
        [FromQuery] int limit = 0,
        [FromQuery] string queryString = "")
        {
            var products = await Mediator.Send(
                new GetFilteredProducts.Query
                {
                    Page = page,
                    Limit = limit,
                    QueryString = queryString
                }
            );

            return Ok(products);
        }
    }
}