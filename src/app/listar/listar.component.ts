import { Component, OnInit, Input } from '@angular/core';
import { ArchivosService } from '../archivos.service';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})
export class ListarComponent implements OnInit {

  //@Input() archivos;

  archivos = [];

  constructor(private servicioArchivo: ArchivosService) { 
    this.servicioArchivo.obtenerArchivos().subscribe(data => {
      this.archivos = data;
    });
  }

  ngOnInit() {
  }

}
