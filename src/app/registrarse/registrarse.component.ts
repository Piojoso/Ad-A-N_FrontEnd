import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registrarse',
  templateUrl: './registrarse.component.html',
  styleUrls: ['./registrarse.component.css']
})
export class RegistrarseComponent implements OnInit {

  email;
  userName;
  pass;
  confirm;

  constructor(private service:UsuarioService, private router:Router) { }

  registrarse() {
    if(this.evaluar() == true){
      this.service.logUp({email:this.email, userName: this.userName, password: this.pass}).subscribe(data => {
        localStorage.setItem('token', data.token.toString());
        this.router.navigateByUrl("/listar");
      });
    }
  }

  evaluar(){
    if(this.pass = this.confirm) return true;
    else return false;
  }

  ngOnInit() {
  }

}
