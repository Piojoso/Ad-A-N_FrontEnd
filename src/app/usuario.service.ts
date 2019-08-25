import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
    return this.http.post<Usuario>(this.baseUrl + '/signup', data)
  }

  logIn(data){
    return this.http.post<Usuario>(this.baseUrl + '/signin', data)
  }
}
