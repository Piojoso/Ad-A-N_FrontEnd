import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { ArchivosService  } from '../archivos.service';
import { Archivo } from '../archivos';

@Component({
  selector: 'app-descargar',
  templateUrl: './descargar.component.html',
  styleUrls: ['./descargar.component.css']
})
export class DescargarComponent implements OnInit {

  archivo: Archivo = null;
  id = null;

  constructor(private servicio: ArchivosService) { 
    
  }

  buscar(id){
    this.servicio.obtenerArchivo(id).subscribe(data=>{
      this.archivo = data;
    });
  }

  descargar(id){
    this.servicio.descargarArchivo(id);
  }

  cancelar(){
    this.archivo = null;
    this.id = null;
  }

  ngOnInit() {
  }
}
