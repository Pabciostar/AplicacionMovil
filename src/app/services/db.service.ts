import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  dbInstancia: SQLiteObject | null = null

  constructor(private sqlite: SQLite) { }

  //Funciones para la creación de la base de datos con una tabla llmada Usuario
  async abrirDB() {
    this.dbInstancia = await this.sqlite.create({
      name: "datos.db",
      location: "default"
    })
    console.log("PI: BASE DE DATOS OK")
  }

  async crearTabla() {
    await this.abrirDB()

    try{
      await this.dbInstancia?.executeSql("CREATE TABLE IF NOT EXISTS USUARIO (CORREO VARCHAR(30), CONTRASENA VARCHAR(30), NOMBRE VARCHAR(30), APELLIDO VARCHAR(30), CARRERA VARCHAR(30), ESTADO BOOLEAN)", [])
      console.log("PI: TABLA CREADA OK")
    } catch(e) {
      console.log("PI: " + JSON.stringify(e))
    }
  }

  //Funcion para almacenar un usuario en la base de datos, se aplica en el login
  async almacenarPersona(correo: string, contrasena: string, nombre: string, apellido: string, carrera: string) {
    await this.crearTabla()

    try{
      await this.dbInstancia?.executeSql("INSERT INTO USUARIO VALUES (?, ?, ?, ?, ?, ?)", [correo, contrasena, nombre, apellido, carrera, false])
      console.log("PI: USUARIO ALMACENADA OK")
    } catch(e){
      console.log("PI: " + JSON.stringify(e))
    }
  }

//Funciones para controlar el estado de logeado
  async cambiarEstadoTrue(correo: string){
    await this.crearTabla()

    try{
      await this.dbInstancia?.executeSql("UPDATE USUARIO SET ESTADO = true WHERE CORREO= ?", [correo])
      console.log("PI: ESTADO USUARIO LOGEADO")
    }catch(e){
      console.log("PI: " + JSON.stringify(e))
    }
  }

  async cambiarEstadoFalse(){
    await this.crearTabla()

    try{
      await this.dbInstancia?.executeSql("UPDATE USUARIO SET ESTADO = false WHERE ESTADO = true")
      console.log("PI: ESTADO USUARIO NOLOGEADO")
    }catch(e) {
      console.log("PI: " + JSON.stringify(e))
    }
  }

  async verificarLogeado(){
    await this.crearTabla()

    try{
      let respuesta = await this.dbInstancia?.executeSql("SELECT COUNT(ESTADO) AS CANTIDAD FROM USUARIO WHERE ESTADO = true",[])
      console.log("PI: VERIFICADO EL LOGEO")
      return JSON.stringify(respuesta.rows.item(0).CANTIDAD)
    }catch(e){
      console.log("PI: " + JSON.stringify(e))
      return '0'
    }
  }

  //Funciones para obtener datos del usuario logeado
  async obtenerCorreo(){
    await this.crearTabla()

    try{
      let respuesta = await this.dbInstancia?.executeSql("SELECT CORREO FROM USUARIO WHERE ESTADO = true",[])
      console.log("PI: CORREO OBTENIDO")
      return respuesta.rows.item(0).CORREO
    }catch(e){
      console.log("PI: " + JSON.stringify(e))
      return ''
    }
  }

  async obtenerContrasena(){
    await this.crearTabla()

    try{
      let respuesta = await this.dbInstancia?.executeSql("SELECT CONTRASENA FROM USUARIO WHERE ESTADO = true",[])
      console.log("PI: CONTRASENA OBTENIDO")
      return JSON.stringify(respuesta.rows.item(0).CONTRASENA)
    }catch(e){
      console.log("PI: " + JSON.stringify(e))
      return ''
    }
  }

  async obtenerNombre(){
    await this.crearTabla()

    try{
      let respuesta = await this.dbInstancia?.executeSql("SELECT NOMBRE FROM USUARIO WHERE ESTADO = true",[])
      console.log("PI: NOMBRE OBTENIDO")
      return JSON.stringify(respuesta.rows.item(0).NOMBRE)
    }catch(e){
      console.log("PI: " + JSON.stringify(e))
      return ''
    }
  }

  async obtenerApellido(){
    await this.crearTabla()

    try{
      let respuesta = await this.dbInstancia?.executeSql("SELECT APELLIDO FROM USUARIO WHERE ESTADO = true",[])
      console.log("PI: APELLIDO OBTENIDO")
      return JSON.stringify(respuesta.rows.item(0).APELLIDO)
    }catch(e){
      console.log("PI: " + JSON.stringify(e))
      return ''
    }
  }

  async obtenerCarrera(){
    await this.crearTabla()

    try{
      let respuesta = await this.dbInstancia?.executeSql("SELECT CARRERA FROM USUARIO WHERE ESTADO = true",[])
      console.log("PI: CARRERA OBTENIDO")
      return JSON.stringify(respuesta.rows.item(0).CARRERA)
    }catch(e){
      console.log("PI: " + JSON.stringify(e))
      return ''
    }
  }


  /// CAMBIO DE CONTRASEÑA Y CARRERA
  async cambiarInfoUsuario(correo: string, carrera: string, contrasena: string){
    await this.crearTabla()

    try {
      await this.dbInstancia?.executeSql("UPDATE USUARIO SET CONTRASENA = ?, CARRERA = ? WHERE CORREO = ?", [contrasena, carrera, correo])
      console.log("PI: CONTRASEÑA CAMBIADA EXITOSAMENTE")
    }catch(e) {
      console.log("PI: " + JSON.stringify(e))
    }
  }

}
