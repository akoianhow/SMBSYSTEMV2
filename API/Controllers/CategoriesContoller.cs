using Application.Categories.Commands;
using Application.Categories.Queries;
using Domain;
using Domain.DTOs;
using Microsoft.AspNetCore.Mvc;


namespace API.Controllers
{
    public class CategoriesController() : BaseApiController
    {
        [HttpGet]
        public async Task<ActionResult<List<CategoryDTO>>> GetCategories()
        {
            var result = await Mediator.Send(new GetCategories.Query());
            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<CategoryDTO>> GetCategoryById(int id)
        {
            return await Mediator.Send(new GetCategoryById.Query { Id = id });
        }
        [HttpPost]
        public async Task<ActionResult<int>> CreateCategory(Category category)
        {
            category.Id = 0;
            return await Mediator.Send(new CreateCategory.Command { Category = category });
        }
        
        [HttpPut]
        public async Task<ActionResult> EditCategory(Category category)
        {
            await Mediator.Send(new EditCategory.Command { Category = category });
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteCategory(int id)
        {
            await Mediator.Send(new DeleteCategory.Command { Id = id });
            return NoContent();
        }

    }
}