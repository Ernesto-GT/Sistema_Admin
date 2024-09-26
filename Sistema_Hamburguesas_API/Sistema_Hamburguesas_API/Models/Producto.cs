namespace Sistema_Hamburguesas_API.Models
{
    public class Producto
    {
        public int Id { get; set; }
        public string Nombre { get; set; }
        public float Costo { get; set; }
        public List<DetalleVenta> Detalle { get; }
    }
}
