import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage implements OnInit {
  info_sedes: any
  nombre: string = ''
  apellido: string = ''

  constructor(private router: Router, private api: ApiService, private db: DbService) { }

  async ngOnInit() {
    this.info_sedes = await this.obtenerInfoSedes()
    console.log(this.info_sedes[0][0], this.info_sedes[0][1])
    this.obtenerInfoUsuario()
  }
  
  async obtenerInfoUsuario() {
    this.nombre =  await this.db.obtenerNombre()
    this.apellido =  await this.db.obtenerApellido()
  }
  
  async obtenerInfoSedes() {
    let datos = this.api.obtenerInfoSedes()
    let respuesta = await lastValueFrom(datos)

    let sedes = JSON.stringify(respuesta)
    return respuesta
  }


  login() {
    this.db.cambiarEstadoFalse()
    this.router.navigate(["login"], {replaceUrl: true})
  }

  info_usuario() {
    this.router.navigate(["info-usuario"], {replaceUrl: true})
  }

}
