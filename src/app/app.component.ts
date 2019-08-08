import { Component } from '@angular/core';
import { ArchivosService } from './archivos.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    
    title = 'Ad-A-N';
    nombre:string = "";

    constructor(private servicio:ArchivosService, private router:Router) {

    }
    
    buscar(nombre){
        this.servicio.buscarArchivo(nombre).subscribe(data=>{
            if(data){
                let url = 'listar/';
                let ids = [];
                let i = 0;
                while(i < data.length){
                    ids.push(data[i]._id.toString());
                    i++;
                }
                url += ids;
                this.router.navigateByUrl(url);
            }
        })
    }

    ngOnInit() {

    }
;}
