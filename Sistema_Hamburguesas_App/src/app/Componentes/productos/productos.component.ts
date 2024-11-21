import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IProducto } from 'src/app/Modelos/IProducto';
import { PizzeriaAPIService } from 'src/app/Servicios/PizzeriaAPI/pizzeria-api.service';
import { MatTableDataSource } from '@angular/material/table';
import { INuevoProducto } from 'src/app/Modelos/INuevo-Producto';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  constructor(private ApiService: PizzeriaAPIService, private router: Router, private toastr: ToastrService){ }

  //Nuevo
  dataSource = new MatTableDataSource<any>();
  cols: string[] = ['id', 'nombre', 'costo', 'acciones']
  datos: any
  bg = false
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    let token = localStorage.getItem('token')?.toString();
    if(!token){
      this.toastr.error("Inicia sesion para continuar", "Acceso denegado");
      this.router.navigateByUrl('login');
    }else{
      this.ApiService.getDatosUsuarioLoggeado().subscribe((res: any) => {
        this.datos = res.value;
        if(this.datos){
          this.isAdmin = this.datos.admin;
        }

        if(!this.isAdmin){
          this.router.navigateByUrl('pedidos');
          this.toastr.error('No cuentas con permisos de administrador', 'Error');
        }
      });
    }

    this.ApiService.getProductos().subscribe({
      next: (res: any) => {
        this.productos = res;
        this.dataSource = new MatTableDataSource(this.productos);
        this.dataSource.sort = this.sort
      },
      error: (error:HttpErrorResponse) => {
        this.toastr.error(error.message, 'Ha ocurrido un error');
      }
    })
  }

  isAdmin: boolean = false;
  showModal: boolean = false;
  showModalAdd: boolean = false;
  showModalEdit: boolean = false;
  productos: IProducto[] = [];
  productoPorEliminar: string = '';


  cambioFondo(){

    if(this.showModal){

      document.getElementsByTagName("thead")[0].style.opacity = "0.5";

    }

  }

  // editarProducto(productoId: number){
  //   //this.router.navigateByUrl(`/editar_producto/${productoId}`);
  //   this.editar.buscarProducto(productoId)
  // }

  deleteProducto(){
    this.ApiService.deleteProducto(this.productoPorEliminar).subscribe({
      next: () => {
        this.showModal = false;
        this.toastr.success(`El producto "${this.productoPorEliminar}" ha sido eliminado exitosamente`);
        this.router.navigateByUrl('/', { replaceUrl: true }).then(() => this.router.navigateByUrl('/productos'));
      },
      error: (error: any) => {
        console.log(error);
        this.toastr.error(error.message, 'Ha ocurrido un error');
      }
    })
  }


  // Agragar

  nuevoProductoForm: FormGroup = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
    precio: new FormControl('', [Validators.required]),
  });

  nuevoProducto: INuevoProducto = {
    Nombre: '',
    Costo: 0
  }

  agregarProducto(){
    this.nuevoProducto.Nombre = this.nuevoProductoForm.controls['nombre'].value;
    this.nuevoProducto.Costo = this.nuevoProductoForm.controls['precio'].value;

    this.ApiService.agregarProducto(this.nuevoProducto).subscribe({
      next: () => {
        this.toastr.success('Producto agregado exitosamente');
        this.nuevoProductoForm.reset();
        this.router.navigateByUrl('/', { replaceUrl: true }).then(() => this.router.navigateByUrl('/productos'));
        //this.router.navigateByUrl('productos');
      },
      error: (error: any) => {
        console.log(error);
        this.toastr.error(error.error, 'Ha ocurrido un error');
      }
    })
  }


  //Editar

  buscarProducto(param: number) : void{
    this.idProducto = param
    this.ApiService.getProductoById(param).subscribe({
      next: (res: any) => {
        this.producto = res;
        console.log(this.producto)
        this.editarProductoForm.controls['nombre'].setValue(this.producto.nombre);
        this.editarProductoForm.controls['precio'].setValue(this.producto.costo);
      },
      error: (error) => {
        this.toastr.error(error.message, 'Ha ocurrido un error');
      }
    })
  }

  //showModal = true;
  editarProductoForm: FormGroup = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
    precio: new FormControl('', [Validators.required]),
  });

  //isAdmin: boolean = false;
  idProducto = -1;
  producto: IProducto = {
    id: -1,
    nombre: '',
    costo: -1
  }


  editarProducto(){
    let datosProducto: INuevoProducto = {
      Nombre: this.editarProductoForm.controls['nombre'].value,
      Costo: this.editarProductoForm.controls['precio'].value
    }
    console.log('DatosP: ', datosProducto)

    this.ApiService.updateProducto(this.idProducto, datosProducto).subscribe({
      next: () => {
        this.toastr.success('Los datos han sido actualizados exitosamente');
        this.router.navigateByUrl('/', { replaceUrl: true }).then(() => this.router.navigateByUrl('/productos'));
        //this.router.navigateByUrl('/productos');
      },
      error: (error) => {
        this.toastr.error(error.message, 'Ha ocurrido un error');
      }
    })
  }
}
