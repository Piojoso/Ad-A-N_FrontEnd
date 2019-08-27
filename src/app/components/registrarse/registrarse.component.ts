import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { Router } from '@angular/router';
import { ShowErrorService } from '../../services/showError/show-error.service';

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

  constructor(
    private service:UsuarioService, 
    private router:Router, 
    private showError: ShowErrorService) { }

  registrarse() {
    if(this.evaluar() == true){
      this.service.logUp({email:this.email, userName: this.userName, password: this.pass}).subscribe(
        data => {
          // Pronto el token dejara de guardarse en el local storage (Pienso ponerlo en un service y que de ahi lo obtengan todos los componentes.)
          localStorage.setItem('token', data.token.toString());
          this.router.navigateByUrl("/listar");
        }, err => {
          this.showError.dispatchError(err);
        }
      );
    }
  }

  evaluar(){
    if(this.pass = this.confirm) return true;
    else return false;
    // DEBO ARREGLAR ESTO, hacerlo mejor, y mas interesante. este tipo de codigo ya no quiero hacerlo.
  }

  ngOnInit() { }

}
