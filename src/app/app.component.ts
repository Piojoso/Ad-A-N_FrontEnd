import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'Ad-A-N';
    
    // Variables

    // Subir Archivo APP
    archivoASubir;
    // Iniciar Sesion APP
    userName;
    passWord;
    // Archivos APP
    archivos = ['Archivo 1', 'Archivo 2', 'Archivo 3', 'Archivo 4'];
    // Descargar Archivo APP
    archivoADescargar = "Texto";

    hola(){
        alert('hola');
    }
;}
