import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.page.html',
  styleUrls: ['./crear-usuario.page.scss'],
})
export class CrearUsuarioPage implements OnInit {

  mdl_correo: string = ''
  mdl_password: string = ''
  mdl_nombre: string = ''
  mdl_apellido: string = ''
  mdl_carrera: string = ''
  mensaje: string = ' ' 
  mostrar_mensaje: boolean = false

  constructor(private router: Router, private api: ApiService, private db: DbService) { }

  ngOnInit() {
    this.db.abrirDB()
  }

  async crearUsuario() {
    let datos = this.api.crearUsuario(this.mdl_correo, this.mdl_password, this.mdl_nombre, this.mdl_apellido, this.mdl_carrera)

    let respuesta = await lastValueFrom(datos)
    let json_texto = JSON.stringify(respuesta)
    let json = JSON.parse(json_texto)

    if (json.message == 'Usuario creado correctamente') {
      this.db.crearTabla()
      this.db.almacenarPersona(this.mdl_correo, this.mdl_password, this.mdl_nombre, this.mdl_apellido, this.mdl_carrera)
    } 

    this.mensaje = json.message
    this.mostrar_mensaje = true
  
    setTimeout(() => {
      this.mostrar_mensaje = false;
    }, 3000);
  }

  login() {
    this.router.navigate(["login"]);
  }


}
