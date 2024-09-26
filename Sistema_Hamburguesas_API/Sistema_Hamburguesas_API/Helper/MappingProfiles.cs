using Sistema_Hamburguesas_API.DTOs;
using Sistema_Hamburguesas_API.Models;
using AutoMapper;
using Microsoft.AspNetCore.Identity;

namespace Sistema_Hamburguesas_API.Mapper
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<ProductoDTO, Producto>();
            CreateMap<Producto, ProductoDTO>();
            CreateMap<Empleado, DatosEmpleadoDTO>();
            CreateMap<NuevoEmpleadoDTO, Empleado>();
            CreateMap<UpdateEmpleadoDTO, Empleado>();
            CreateMap<Empleado, UpdateEmpleadoDTO>();
            CreateMap<DetalleVenta, DetallesDTO>();
            CreateMap<Venta, VentaDTO>();
            CreateMap<NuevoDetalleVentaDTO, DetalleVenta>();
            CreateMap<NuevoProductoDTO, Producto>();
        }
    }
}
