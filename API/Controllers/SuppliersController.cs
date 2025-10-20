using System.Runtime.CompilerServices;
using Application.Suppliers.Commands;
using Application.Suppliers.Queries;
using Domain;
using Domain.DTOs;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class SuppliersController:BaseApiController
    {
        [HttpGet]
        public async Task<ActionResult<List<SupplierDTO>>> GetSuppliers()
        {
            return await Mediator.Send(new GetSuppliers.Query());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<SupplierDTO>> GetSupplierById(int id)
        {
            return await Mediator.Send(new GetSupplierById.Query { Id = id });
        }

        [HttpPost]
        public async Task<ActionResult<int>> CreateSupplier(Supplier supplier)
        {
            return await Mediator.Send(new CreateSupplier.Command { Supplier = supplier });

        }

        [HttpPut]
        public async Task<ActionResult> EditSupplier(Supplier supplier)
        {
            await Mediator.Send(new EditSupplier.Command { Supplier = supplier });
            return NoContent();
        }

        [HttpDelete("{id}")]

        public async Task<ActionResult> DeleteSupplier(int id)
        {
            await Mediator.Send(new DeleteSupplier.Command { Id = id });
            return NoContent();
        }

    }
}