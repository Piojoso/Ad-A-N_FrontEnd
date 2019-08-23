import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

import { Usuario } from './usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  baseUrl = 'http://192.168.1.197:3000/api';

  constructor(private http: HttpClient) { }

  // Setea configuracion de header.
  httpOption = {
    headers: new HttpHeaders({
      'Content-Type':'application/json'
    })
  }

  logUp(data){
    return this.http.post<Usuario>(this.baseUrl + '/signup', data)/*.pipe(retry(1),catchError(this.errorHandl));*/
  }

  logIn(data){
    return this.http.post<Usuario>(this.baseUrl + '/signin', data)/*.pipe(retry(0),catchError(this.errorHandl));*/
  }

  errorHandl(error){
    console.log(error);
    console.log(error.error);
    let errorMessage = '';
    if (error.error instanceof ErrorEvent){
      errorMessage = error.error.message;
    }else{
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
