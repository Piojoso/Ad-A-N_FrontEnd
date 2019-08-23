import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../usuario.service';
import { Usuario } from '../usuario';
import { Router } from '@angular/router';

@Component({
    selector: 'app-iniciar-sesion',
    templateUrl: './iniciar-sesion.component.html',
    styleUrls: ['./iniciar-sesion.component.css']
})
export class IniciarSesionComponent implements OnInit {

    email;
    pass;

    err;

    constructor(private service:UsuarioService, private router:Router) { 
        /*
        */
    }

    ngOnInit() {
    }

    showError(err){
        this.err = null;
        this.err = err;
    }

    close(){
        this.err = null;
    }

    login(){
        this.service.logIn({email: this.email, password: this.pass}).subscribe(data =>{
            if(data) {
                console.log(data);
                localStorage.setItem('token', data.token.toString());
                this.router.navigateByUrl('/listar');
            }
        }, err =>{
            this.showError(err);
        })
        
    }
}
