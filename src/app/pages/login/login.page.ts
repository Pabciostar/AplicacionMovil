import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  mdl_correo: string = ''
  mdl_contrasena: string = ''
  mensaje: string = ' '
  mostrar_mensaje: boolean = false

  constructor(private router: Router, private api: ApiService, private db: DbService) { }

  async ngOnInit() {
    await this.db.abrirDB()
    let respuesta = await this.db.verificarLogeado()
    console.log(respuesta)

    if (respuesta == '1'){
      this.router.navigate(['principal'])
    } else {
      console.log("no hay usuarios logueados")
    }
  }

  navegarCrearUsuario(){
    this.router.navigate(['crear-usuario'])
  }

  async login(){
    let datos = this.api.login(this.mdl_correo, this.mdl_contrasena)
    let respuesta = await lastValueFrom(datos)

    let json_texto = JSON.stringify(respuesta)
    let json = JSON.parse(json_texto)

    if(json.status == 'success') {
      console.log(json.message)
      this.db.cambiarEstadoTrue(this.mdl_correo)
      this.router.navigate(['principal'], {replaceUrl: true})
    } else {
      console.log(json.message)
      this.mensaje = json.message
      this.mostrar_mensaje = true

      setTimeout(() => {
        this.mostrar_mensaje = false;
      }, 3000);
    }
  }
}
