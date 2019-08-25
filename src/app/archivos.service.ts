import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { saveAs } from 'file-saver';

import { Archivo } from './archivos';
import { ShowErrorService } from './show-error.service';

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
      'Content-Type':'application/json'
    })
  }
  
  // Lista todos los Archivos
  obtenerArchivos(){
    return this.http.get<Archivo[]>(this.baseurl + '/archivo/')
  }

  // Obtiene Info de un Archivo puntual
  obtenerArchivo(id){
    return this.http.get<Archivo>(this.baseurl + '/archivo/info/' + id)
  }

  // Obtiene toda la informacion de los archivos que hagan match con el texto enviado en el nombre
  buscarArchivo(nombre){
    return this.http.get<Archivo[]>(this.baseurl + '/archivo/find/' + nombre)
  }

  // Descarga un Archivo puntual
  descargarArchivo(id){
    let infoFile;
    this.obtenerArchivo(id).subscribe(
      data => {
        infoFile = data;
        saveAs('192.168.1.197:3000/api/archivo/' + id, infoFile.name);
      }, err =>{
        this.showError.dispatchError(err);
      }
    );
  }

  // Sube un Archivo
  subirArchivo(data){
    return this.http.post<Archivo>(this.baseurl + '/archivo/', data)
  }

  // Futuro actualizador de archivos...
  actualizarArchivo(id, data){
    return this.http.put<Archivo>(this.baseurl + '/archivo/' + id, JSON.stringify(data), this.httpOption)
  }

  // Borra un archivo
  borrarArchivo(id){
    return this.http.delete<Archivo>(this.baseurl + '/archivo/' + id, this.httpOption)
  }

}
