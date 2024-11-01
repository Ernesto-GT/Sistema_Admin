﻿using Sistema_Hamburguesas_API.Data;
using Sistema_Hamburguesas_API.DTOs;
using Sistema_Hamburguesas_API.Models;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Sistema_Hamburguesas_API.Controllers
{
    [Route("empleados")]
    [ApiController]
    //[Authorize(Roles = "Admin")]
    public class EmpleadoController : Controller
    {
        private readonly DataContext _dataContext;
        private readonly IMapper _mapper;

        public EmpleadoController(DataContext dataContext, IMapper mapper)
        {
            _dataContext = dataContext;
            _mapper = mapper;
        }


        // Obtiene la lista de datos de los empleados
        [HttpGet]
        public async Task<ActionResult<List<Empleado>>> GetEmpleados() 
        {
            var empleados = await _dataContext.Empleados.ToListAsync();
            return Ok(_mapper.Map<List<DatosEmpleadoDTO>>(empleados));
        }


        // Obtiene los datos del usuario por su ID
        [HttpGet("{numEmpleado:int}")]
        public async Task<ActionResult<Empleado>> GetEmpleadoById(int numEmpleado)
        {
            var existeEmpleado = await _dataContext.Empleados.AnyAsync(e =>e.NumEmpleado == numEmpleado);
            if(!existeEmpleado)
            {
                return BadRequest("Numero de empleado no encontrado");
            }

            Empleado empleado = await _dataContext.Empleados.FirstAsync(e => e.NumEmpleado == numEmpleado);
            return Ok(_mapper.Map<UpdateEmpleadoDTO>(empleado));
        }


        // Crea un nuevo empleado
        [HttpPost]
        public async Task<ActionResult> AgregarEmpleado(NuevoEmpleadoDTO nuevoEmpleado)
        {
            Empleado empleado = _mapper.Map<Empleado>(nuevoEmpleado);

            try
            {
                _dataContext.Add(empleado);
                await _dataContext.SaveChangesAsync();
                return Ok();

            }catch(Exception ex)
            {
                return BadRequest("Error. " + ex);
            }
        }


        // Modifica los datos del empleado por su Id
        [HttpPut("{numEmpleado:int}")]
        public async Task<ActionResult> modificarEmpleado(int numEmpleado, UpdateEmpleadoDTO nuevosDatosEmpleado)
        {
            var existeEmpleado = await _dataContext.Empleados.AnyAsync(e => e.NumEmpleado == numEmpleado);
            if (!existeEmpleado)
            {
                return BadRequest("Numero de empleado no encontrado");
            }

            int idEmpleado = await _dataContext.Empleados.Where(e => e.NumEmpleado == numEmpleado).Select(e => e.Id).FirstAsync();
            Empleado empleadoActualizado = _mapper.Map<Empleado>(nuevosDatosEmpleado);
            empleadoActualizado.Id = idEmpleado;
            empleadoActualizado.NumEmpleado = numEmpleado;

            try
            {
                _dataContext.Update(empleadoActualizado);
                await _dataContext.SaveChangesAsync();
                return Ok();
            }catch(Exception e)
            {
                return BadRequest("Error. " + e);
            }

        }


        [HttpDelete("{numEmpleado:int}")]
        public async Task<ActionResult> eliminarEmpleado(int numEmpleado)
        {
            var existeEmpleado = await _dataContext.Empleados.AnyAsync(e => e.NumEmpleado == numEmpleado);
            if (!existeEmpleado) 
            {
                return BadRequest("Numero de empleado no encontrado");
            };

            Empleado empleado = await _dataContext.Empleados.FirstAsync(e => e.NumEmpleado == numEmpleado);

            try
            {
                _dataContext.Empleados.Remove(empleado);
                await _dataContext.SaveChangesAsync();
                return Ok();
            }catch(Exception ex)
            {
                return BadRequest("Error. " + ex);
            }
        }
    }
}
