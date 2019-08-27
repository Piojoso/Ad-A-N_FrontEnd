import { Component, OnInit } from '@angular/core';
import { ArchivosService } from '../../services/archivos/archivos.service';
import { ActivatedRoute } from '@angular/router';
import { ShowErrorService } from '../../services/showError/show-error.service';
import { SearchResultService } from 'src/app/services/searchResults/search-result.service';
import { async } from 'q';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})
export class ListarComponent implements OnInit {

  archivos = [];

  public ids$;

  constructor(
    private servicioArchivo: ArchivosService, 
    private router: ActivatedRoute,
    private showError: ShowErrorService,
    private searchResult: SearchResultService) { }

  listarItems(){
    this.servicioArchivo.obtenerArchivos().subscribe(
      data => {
        this.archivos = data;
      }, err => {
        this.dispatchError(err);
      }
    );
  }

  buscar(){
    let array = this.ids$.source._value;
    for (let id of array) {
      this.servicioArchivo.obtenerArchivo(id).subscribe(
        data=>{
          this.archivos.push(data);
        }, err => {
          this.dispatchError(err);
        }
      );
    }
  }

  descargar(id){
    this.servicioArchivo.descargarArchivo(id);
  }

  Eliminar(id) {
    this.servicioArchivo.borrarArchivo(id).subscribe(
      ()=>{
        this.listarItems();
      }, err => {
        this.dispatchError(err);
      }
    );
  }

  dispatchError(err) {
    this.showError.dispatchError(err);
  }

  ngOnInit() {
    this.ids$ = this.searchResult.select$();
    console.log('Esta por iniciar el buscar...');
    if(this.router.snapshot.url.length > 1)
      this.buscar();
    else
      this.listarItems();
  }
}
