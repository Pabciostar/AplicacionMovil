import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-info-usuario',
  templateUrl: './info-usuario.page.html',
  styleUrls: ['./info-usuario.page.scss'],
})
export class InfoUsuarioPage implements OnInit {
  mdl_carrera_nueva: string = ''
  mdl_contrasena_nueva: string = ''
  correo: string = ''
  nombre: string = ''
  apellido: string = ''
  carrera: string = ''
  contrasena: string = ''
  mensaje = ''
  mostrar_mensaje = false
  constructor(private router: Router, private api: ApiService, private db: DbService) { }

  async ngOnInit() {
    await this.obtenerInfoUsuario()
  }

  principal() {
    this.router.navigate(["principal"], {replaceUrl: true})
  }

  async obtenerInfoUsuario() {
    this.correo = await this.db.obtenerCorreo()
    this.nombre =  await this.db.obtenerNombre()
    this.apellido =  await this.db.obtenerApellido()
    this.carrera = await this.db.obtenerCarrera()
    this.contrasena = await this.db.obtenerContrasena()
  }
  

  async cambiarInfoUsuario(){
    let correo = await this.db.obtenerCorreo()
    console.log(correo, this.mdl_carrera_nueva, this.mdl_contrasena_nueva)
    let datos = this.api.actualizarInformacion(correo, this.mdl_carrera_nueva, this.mdl_contrasena_nueva)
    let respuesta = await lastValueFrom(datos)

    let json_texto = JSON.stringify(respuesta)
    let json = JSON.parse(json_texto)

    if(json.status == 'success') {
      console.log(json.message)
      this.db.cambiarInfoUsuario(this.correo, this.mdl_carrera_nueva, this.mdl_contrasena_nueva)
      this.mensaje = json.message
      this.mostrar_mensaje = true
      setTimeout(() => {
        this.mostrar_mensaje = false
      }, 2000)
      this.db.cambiarEstadoFalse()
      this.router.navigate(["login"], {replaceUrl: true})
    } else {
      console.log(json.message)
      this.mensaje = json.message
      this.mostrar_mensaje = true

      setTimeout(() => {
        this.mostrar_mensaje = false
      }, 3000)
    }
  }
}
