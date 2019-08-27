import { Component } from '@angular/core';
import { ArchivosService } from './services/archivos/archivos.service';
import { Router } from '@angular/router';
import { ShowErrorService } from './services/showError/show-error.service';
import { SearchResultService  } from './services/searchResults/search-result.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    
    title = 'Ad-A-N';
    nombre:string = "";

    public error$;
    

    constructor(
        private servicio:ArchivosService, 
        private router:Router, 
        private showError:ShowErrorService,
        private searchResult:SearchResultService
        ) { }
    
    buscar(nombre){
        this.servicio.buscarArchivo(nombre).subscribe(
            data => {
                let ids = [];
                for(let id of data){
                    ids.push(id._id);
                }
                this.searchResult.dispatchIds(ids);
                this.router.navigateByUrl('listar/search');
            }, err => {
            this.showError.dispatchError(err);
            }
        );
    }

    ngOnInit() {
        this.error$ = this.showError.select$();
    }
;}
