﻿using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Sistema_Hamburguesas_API.Migrations
{
    /// <inheritdoc />
    public partial class UpdateEmpleado : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "0ab4403b-ff27-4147-a8a5-fecd9ea203c2");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "61b4e944-c1da-4494-8c62-e3f08275493b");

            migrationBuilder.DropColumn(
                name: "Contraseña",
                table: "Empleados");

            migrationBuilder.DropColumn(
                name: "Sueldo",
                table: "Empleados");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "10e98c7f-f0b2-43cd-8842-9b683872d7b4", "1", "Admin", "Admin" },
                    { "74ab20c3-ee49-4c5d-8ebb-7b05c63121c0", "2", "User", "User" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "10e98c7f-f0b2-43cd-8842-9b683872d7b4");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "74ab20c3-ee49-4c5d-8ebb-7b05c63121c0");

            migrationBuilder.AddColumn<string>(
                name: "Contraseña",
                table: "Empleados",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<float>(
                name: "Sueldo",
                table: "Empleados",
                type: "real",
                nullable: false,
                defaultValue: 0f);

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "0ab4403b-ff27-4147-a8a5-fecd9ea203c2", "1", "Admin", "Admin" },
                    { "61b4e944-c1da-4494-8c62-e3f08275493b", "2", "User", "User" }
                });
        }
    }
}
