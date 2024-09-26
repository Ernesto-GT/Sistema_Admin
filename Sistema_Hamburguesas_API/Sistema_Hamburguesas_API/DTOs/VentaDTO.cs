using Sistema_Hamburguesas_API.Models;

namespace Sistema_Hamburguesas_API.DTOs
{
    public class VentaDTO
    {
        public int Id { get; set; }
        public int IdEmpleado { get; set; }
        public DateTime Fecha { get; set; }
        public float Total { get; set; }
    }
}
