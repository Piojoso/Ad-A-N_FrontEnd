import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { saveAs } from 'file-saver';

import { Archivo } from '../../interfaces/archivos';
import { ShowErrorService } from '../showError/show-error.service';

@Injectable({
  providedIn: 'root'
})
export class ArchivosService {

  // Base url
  baseurl = 'http://192.168.1.197:3000/api';

  constructor(private http: HttpClient, private showError: ShowErrorService) { }

  // Header configuration (Solo para que cors me deje pasar, aun no esta el temita de los tokens)
  httpOption = {
    headers: new HttpHeaders({
      authorization: 'bearer ' + localStorage.getItem('token')
    })
  }

  private hayToken(){
    this.httpOption.headers = new HttpHeaders({
      authorization: 'bearer ' + localStorage.getItem('token')
    });
  }

  // Lista todos los Archivos
  obtenerArchivos(){
    this.hayToken();
    return this.http.get<Archivo[]>(this.baseurl + '/archivo/', this.httpOption);
  }

  // Obtiene Info de un Archivo puntual
  obtenerArchivo(id){
    this.hayToken();
    return this.http.get<Archivo>(this.baseurl + '/archivo/info/' + id, this.httpOption);
  }

  // Obtiene toda la informacion de los archivos que hagan match con el texto enviado en el nombre
  buscarArchivo(nombre){
    this.hayToken();
    return this.http.get<Archivo[]>(this.baseurl + '/archivo/find/' + nombre, this.httpOption);
  }

  // Descarga un Archivo puntual
  descargarArchivo(id){
    let infoFile;
    this.obtenerArchivo(id).subscribe(
      data => {
        infoFile = data;
        saveAs('http://192.168.1.197:3000/api/archivo/file/' + id, infoFile.name);
      }, err =>{
        this.showError.dispatchError(err);
      }
    );
  }

  // Sube un Archivo
  subirArchivo(data){
    this.hayToken();
    return this.http.post<Archivo>(this.baseurl + '/archivo/', data, this.httpOption);
  }

  // Futuro actualizador de archivos...
  actualizarArchivo(id, data){
    this.hayToken();
    return this.http.put<Archivo>(this.baseurl + '/archivo/' + id, data, this.httpOption);
  }

  // Borra un archivo
  borrarArchivo(id){
    this.hayToken();
    return this.http.delete<Archivo>(this.baseurl + '/archivo/' + id, this.httpOption);
  }

}
