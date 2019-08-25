import { Component, OnInit } from '@angular/core';
import { ArchivosService  } from '../archivos.service';
import { Archivo } from '../archivos';
import { ShowErrorService } from '../show-error.service';

@Component({
  selector: 'app-descargar',
  templateUrl: './descargar.component.html',
  styleUrls: ['./descargar.component.css']
})
export class DescargarComponent implements OnInit {

  archivo: Archivo = null;
  id = null;

  constructor(private servicio: ArchivosService, private showError: ShowErrorService) { }

  buscar(id){
    this.servicio.obtenerArchivo(id).subscribe(data=>{
      this.archivo = data;
    }, err => {
      this.showError.dispatchError(err);
    });
  }

  descargar(id){
    this.servicio.descargarArchivo(id);
  }

  cancelar(){
    this.archivo = null;
    this.id = null;
  }

  ngOnInit() { }
}
