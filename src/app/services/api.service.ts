import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  ruta: string = 'https://www.s2-studio.cl/api_duoc/usuario/'
  constructor(private http: HttpClient) { }

  crearUsuario(correo: string, contrasena: string, nombre: string, apellido: string, carrera: string){
    let objeto: any = {}
    objeto.correo = correo
    objeto.contrasena = contrasena
    objeto.nombre = nombre
    objeto.apellido = apellido
    objeto.carrera = carrera

    return this.http.post(this.ruta + 'usuario_almacenar', objeto).pipe()
  }


  login(correo:string, contrasena : string){
    let objeto: any = {}
    objeto.correo = correo
    objeto.contrasena = contrasena

    return this.http.post(this.ruta + 'usuario_login', objeto).pipe()
  }

  obtenerInfoSedes(){
    return this.http.get(this.ruta + 'sedes_obtener')
  }

  actualizarInformacion(correo:string, carrera: string, contrasena: string) {
    let objeto: any = {}
    objeto.correo = correo
    objeto.contrasena = contrasena
    objeto.carrera = carrera

    return this.http.patch(this.ruta + 'usuario_modificar', objeto).pipe()
  }
}

// Usuarios creados:
// coco@gmail.com
// tarro@gmail.com
// terro@gmail.com
