﻿namespace Sistema_Hamburguesas_API.DTOs
{
    public class VentaProductoDTO
    {
        public string Producto { get; set; } = string.Empty;
        public float Precio { get; set; }
        public int CantidadVendida { get; set; }
        public float Ganancias { get; set; }
    }
}
