import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-iniciar-sesion',
    templateUrl: './iniciar-sesion.component.html',
    styleUrls: ['./iniciar-sesion.component.css']
})
export class IniciarSesionComponent implements OnInit {

    constructor() { }

    ngOnInit() {
    }

    hola(inputUser, inputPass){
        //inputUser.value tiene el nombre de usuario ingresado
        //inputPass.value tiene la contraseña ingresada
        return false;
    }
}
