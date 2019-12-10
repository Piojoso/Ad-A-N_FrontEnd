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
            if(localStorage.getItem('token')){
                localStorage.removeItem('token');
            }
            localStorage.setItem('token', data.token.toString());
            this.router.navigateByUrl("/listar");
            window.location.reload();
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

    emailValido = /^\w+@\w+\.\w{3}(\.\w{2})?$/;
    userNameValido = /^([A-Z][a-z]){2,25}$/;

    validarEmail(input) {
        this.email = input.value;
        if(!this.emailValido.test(this.email)){
            this.showError.dispatchError({error:{message:'Email Invalido'}});
        }
    }

    validarUserName(input){
        let nombre = input.value;
        if(!this.userNameValido.test(nombre)){
            this.showError.dispatchError({error:{message:'Nombre de Usuario Invalido'}});
        }
    }

    ngOnInit() { }

}
