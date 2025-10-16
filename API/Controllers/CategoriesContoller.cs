using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Categories.Queries;
using Domain.DTOs;
using Microsoft.AspNetCore.Mvc;


namespace API.Controllers
{
    public class CategoriesContoller() : BaseApiController
    {
        [HttpGet]
        public async Task<ActionResult<List<CategoryDTO>>> GetCategories()
        {
            return await Mediator.Send(new GetCategories.Query());
        }
    }
}