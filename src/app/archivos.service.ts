import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

import { Archivo } from './archivos';

@Injectable({
  providedIn: 'root'
})
export class ArchivosService {

  // Base url
  baseurl = 'http://192.168.1.197:3000/api';

  constructor(private http: HttpClient) { 
    //console.log('Service is now Working');
  }

  // Header configuration (Solo para que cors me deje pasar, aun no esta el temita de los tokens)
  httpOption = {
    headers: new HttpHeaders({
      'Content-Type':'application/json'
    })
  }
  
  // Lista todos los Archivos (ITS WORKINKG)
  obtenerArchivos(){
    return this.http.get<Archivo[]>(this.baseurl + '/archivo/').pipe(retry(1),catchError(this.errorHandl));
  }

  // Descarga un archivo puntual
  obtenerArchivo(id){
    return this.http.get<Archivo>(this.baseurl + '/archivo/' + id).pipe(retry(1),catchError(this.errorHandl));
  }

  // Sube un Archivo (ITS WORKING)
  subirArchivo(data){
    return this.http.post<Archivo>(this.baseurl + '/archivo/', data/*, this.httpOption*/).pipe(retry(1),catchError(this.errorHandl));
  }

  // Futuro actualizador de archivos...
  actualizarArchivo(id, data){
    return this.http.put<Archivo>(this.baseurl + '/archivo/' + id, JSON.stringify(data), this.httpOption).pipe(retry(1),catchError(this.errorHandl));
  }

  // Borra un archivo
  borrarArchivo(id){
    return this.http.delete<Archivo>(this.baseurl + '/archivo/' + id, this.httpOption).pipe(retry(1),catchError(this.errorHandl));
  }

  // Capturador de errores si mal no estoy.
  errorHandl(error){
    let errorMessage = '';
    if (error.error instanceof ErrorEvent){
      errorMessage = error.error.message;
    }else{
      errorMessage = `Error Code: ${error.status}\nMessage:${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

}
