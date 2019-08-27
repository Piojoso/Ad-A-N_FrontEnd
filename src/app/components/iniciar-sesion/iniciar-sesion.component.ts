import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { Router } from '@angular/router';
import { ShowErrorService } from '../../services/showError/show-error.service';

@Component({
    selector: 'app-iniciar-sesion',
    templateUrl: './iniciar-sesion.component.html',
    styleUrls: ['./iniciar-sesion.component.css']
})
export class IniciarSesionComponent implements OnInit {

    email;
    pass;

    constructor(
        private service:UsuarioService, 
        private router:Router, 
        private showError:ShowErrorService
        ) { }

    ngOnInit() { }

    login() {
        this.service.logIn({email: this.email, password: this.pass}).subscribe(
            data =>{
                localStorage.setItem('token', data.token.toString());
                this.router.navigateByUrl('/listar');
            }, err =>{
                this.showError.dispatchError(err);
            }
        );
    }
}
