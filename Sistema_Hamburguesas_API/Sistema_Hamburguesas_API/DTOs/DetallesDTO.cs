using Sistema_Hamburguesas_API.Models;

namespace Sistema_Hamburguesas_API.DTOs
{
    public class DetallesDTO
    {
        public int VentaId { get; set; }
        public int ProductoId { get; set; }
        public int Cantidad { get; set; }
    }
}
