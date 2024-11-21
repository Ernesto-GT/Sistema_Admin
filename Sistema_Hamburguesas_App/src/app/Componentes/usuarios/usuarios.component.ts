import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IDatosUsuario } from 'src/app/Modelos/IDatosUsuario';
import { PizzeriaAPIService } from 'src/app/Servicios/PizzeriaAPI/pizzeria-api.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  // @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private ApiService: PizzeriaAPIService, private toastr: ToastrService, private router: Router,) { }

  //Nuevo
  dataSource = new MatTableDataSource<any>();
  cols: string[] = ['id', 'nombre', 'correo', 'telefono', 'estatus', 'acciones']

  ngOnInit(): void {
    // Valida que haya un usuario loggeado
    let token = localStorage.getItem('token')?.toString();
    if(!token){
      this.toastr.error("Inicia sesion para continuar", "Acceso denegado");
      this.router.navigateByUrl('login');
      return;
    }else{
      this.ApiService.getDatosUsuarioLoggeado().subscribe({
        next: (data: any) => {
          this.loggedUser = data.value;
        },
        error: (error: HttpErrorResponse) => {
          this.toastr.error(error.message, 'Ha ocurrido un error');
          console.log(error.message);
        }
      })
    }

    // Obtiene la lista de usuarios a mostrar
    this.ApiService.getUsuarios().subscribe({
      next: (data) => {
        this.usuarios = Object.values(data);
        //this.aplicarDatosTabla(this.usuarios)
        this.dataSource = new MatTableDataSource(this.usuarios);
        this.dataSource.sort = this.sort;
        //console.log(this.dataSource)
      },
      error: (error: HttpErrorResponse) => {
        // Regresa al usuario si no es administrador
        if(error.status === 403){
          this.toastr.error('No cuentas con permisos de Administrador', 'Acceso denegado');
          this.router.navigateByUrl('pedidos');
          return;
        }

        this.toastr.error(error.message, 'Ha ocurrido un error');
        console.log(error);
      }
    });
  }

  modalEliminar: boolean = false;
  numEmpleadoEliminar: number = -1;

  usuarios: IDatosUsuario[] = []
  loggedUser: IDatosUsuario = {
    nombre: '',
    correo: '',
    telefono: '',
    numEmpleado: -1,
    admin: false
  }

  cambioFondo(){

    if(this.modalEliminar){

      document.getElementsByTagName("thead")[0].style.opacity = "0.5";

    }

  }

  showModal(numEmpleado: number){
    this.numEmpleadoEliminar = numEmpleado;
    this.modalEliminar = true;
  }

  editarUsuario(numEmpleado: number){
    this.router.navigateByUrl(`/editar_usuario/${numEmpleado}`);
  }

  deleteUsuario(){
    this.ApiService.deleteUser(this.numEmpleadoEliminar).subscribe({
      next: () => {
        this.ApiService.deleteEmpleado(this.numEmpleadoEliminar).subscribe({
          next: () => {
            this.toastr.success(`Empleado ${this.numEmpleadoEliminar} eliminado`);
            this.numEmpleadoEliminar = -1;
            this.router.navigateByUrl('/', { replaceUrl: true })
              .then(() => this.router.navigateByUrl('/usuarios'));
          },
          error: (error: HttpErrorResponse) => {
            console.log(error);
            this.toastr.error(error.message, 'Ha ocurrido un error');
          }
        });
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
        this.toastr.error(error.message, 'Ha ocurrido un error');
      }
    });
  }

  // aplicarDatosTabla(data: any[]): void {
  //   this.dataSource = new MatTableDataSource(data);
  //   this.paginator._intl.itemsPerPageLabel = 'Elementos por página';
  //   this.paginator.pageSize = 10;
  //   this.dataSource.paginator = this.paginator;
  //   this.dataSource.sort = this.sort;
  // }
}
